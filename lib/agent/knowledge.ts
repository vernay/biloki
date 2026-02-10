import fs from 'fs/promises';
import path from 'path';
import type OpenAI from 'openai';

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, '.cache');
const INDEX_FILE = path.join(CACHE_DIR, 'agent-index.json');

const SOURCE_DIRS = ['app', 'components', 'lib', 'messages'];
const SOURCE_FILES = ['README.md'];
const ALLOWED_EXT = new Set(['.tsx', '.ts', '.md', '.json']);

export type KnowledgeChunk = {
  id: string;
  text: string;
  source: string;
};

export type KnowledgeIndex = {
  builtAt: string;
  files: Record<string, { mtimeMs: number; size: number }>;
  chunks: KnowledgeChunk[];
  embeddings: number[][];
};

let inMemoryIndex: KnowledgeIndex | null = null;
let inFlight: Promise<KnowledgeIndex> | null = null;

async function listFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', 'public'].includes(entry.name)) continue;
      files.push(...await listFilesRecursively(fullPath));
    } else {
      const ext = path.extname(entry.name);
      if (ALLOWED_EXT.has(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function collectSourceFiles(): Promise<string[]> {
  const files: string[] = [];
  for (const dir of SOURCE_DIRS) {
    const fullDir = path.join(ROOT, dir);
    try {
      files.push(...await listFilesRecursively(fullDir));
    } catch {
      // ignore missing dirs
    }
  }
  for (const file of SOURCE_FILES) {
    const fullFile = path.join(ROOT, file);
    try {
      await fs.access(fullFile);
      files.push(fullFile);
    } catch {
      // ignore
    }
  }
  return files;
}

async function getFileStats(files: string[]) {
  const stats: Record<string, { mtimeMs: number; size: number }> = {};
  await Promise.all(
    files.map(async (file) => {
      const stat = await fs.stat(file);
      stats[file] = { mtimeMs: stat.mtimeMs, size: stat.size };
    })
  );
  return stats;
}

function flattenJsonStrings(value: unknown, out: string[]) {
  if (typeof value === 'string') {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => flattenJsonStrings(item, out));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => flattenJsonStrings(item, out));
  }
}

function extractStringLiterals(content: string): string[] {
  const matches: string[] = [];
  const regex = /(["'`])((?:\\.|(?!\1).)*)\1/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content))) {
    const text = match[2].trim();
    if (text.length < 6) continue;
    if (/^(https?:\/\/|\.|\.|\/|@\/|\w+\.(tsx|ts|css|png|jpg|svg|webp))/.test(text)) continue;
    if (/(className=|href=|src=)/.test(match[0])) continue;
    if (!/[a-zA-ZÀ-ÿ]/.test(text)) continue;
    matches.push(text);
  }
  return matches;
}

function extractTextFromTsx(content: string): string {
  const withoutImports = content
    .split('\n')
    .filter((line) => !line.trim().startsWith('import ') && !line.trim().startsWith('export '))
    .join('\n');

  const textBetweenTags = withoutImports
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ');

  const literals = extractStringLiterals(withoutImports).join(' ');

  return `${textBetweenTags} ${literals}`;
}

function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function chunkText(text: string, maxLen = 800): string[] {
  const parts = text.split(/(?<=[.!?])\s+|\n+/g).map((t) => t.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = '';
  for (const part of parts) {
    if ((current + ' ' + part).trim().length > maxLen) {
      if (current.trim()) chunks.push(current.trim());
      current = part;
    } else {
      current = `${current} ${part}`.trim();
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

async function buildIndex(openai: OpenAI): Promise<KnowledgeIndex> {
  const files = await collectSourceFiles();
  const stats = await getFileStats(files);
  const chunks: KnowledgeChunk[] = [];

  for (const file of files) {
    const ext = path.extname(file);
    const raw = await fs.readFile(file, 'utf-8');
    let text = '';

    if (ext === '.json') {
      const values: string[] = [];
      try {
        const parsed = JSON.parse(raw);
        flattenJsonStrings(parsed, values);
        text = values.join(' ');
      } catch {
        text = raw;
      }
    } else if (ext === '.md') {
      text = raw;
    } else {
      text = extractTextFromTsx(raw);
    }

    const normalized = normalizeText(text);
    if (!normalized) continue;

    const fileChunks = chunkText(normalized, 800);
    const relative = path.relative(ROOT, file);
    fileChunks.forEach((chunk, index) => {
      chunks.push({
        id: `${relative}::${index}`,
        text: chunk,
        source: relative,
      });
    });
  }

  const embeddings: number[][] = [];
  const batchSize = 50;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize).map((c) => c.text);
    const res = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: batch,
    });
    res.data.forEach((item) => embeddings.push(item.embedding));
  }

  const index: KnowledgeIndex = {
    builtAt: new Date().toISOString(),
    files: stats,
    chunks,
    embeddings,
  };

  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(INDEX_FILE, JSON.stringify(index));

  return index;
}

function indexIsFresh(index: KnowledgeIndex, stats: Record<string, { mtimeMs: number; size: number }>) {
  const indexFiles = Object.keys(index.files);
  const currentFiles = Object.keys(stats);
  if (indexFiles.length !== currentFiles.length) return false;
  for (const file of currentFiles) {
    const prev = index.files[file];
    const curr = stats[file];
    if (!prev || prev.mtimeMs !== curr.mtimeMs || prev.size !== curr.size) return false;
  }
  return true;
}

async function loadIndexFromDisk(): Promise<KnowledgeIndex | null> {
  try {
    const raw = await fs.readFile(INDEX_FILE, 'utf-8');
    return JSON.parse(raw) as KnowledgeIndex;
  } catch {
    return null;
  }
}

function buildIndexInBackground(openai: OpenAI) {
  if (inFlight) return;
  inFlight = (async () => {
    const rebuilt = await buildIndex(openai);
    inMemoryIndex = rebuilt;
    return rebuilt;
  })();
  inFlight
    .catch((error) => {
      console.error('Erreur buildIndex (background):', error);
    })
    .finally(() => {
      inFlight = null;
    });
}

export async function getKnowledgeIndex(openai: OpenAI): Promise<KnowledgeIndex> {
  if (inMemoryIndex) return inMemoryIndex;

  const files = await collectSourceFiles();
  const stats = await getFileStats(files);

  const diskIndex = await loadIndexFromDisk();
  if (diskIndex) {
    inMemoryIndex = diskIndex;
    if (!indexIsFresh(diskIndex, stats)) {
      buildIndexInBackground(openai);
    }
    return diskIndex;
  }

  const empty: KnowledgeIndex = {
    builtAt: new Date().toISOString(),
    files: {},
    chunks: [],
    embeddings: [],
  };

  buildIndexInBackground(openai);
  return empty;
}

export async function searchKnowledge(openai: OpenAI, index: KnowledgeIndex, query: string, topK = 6): Promise<KnowledgeChunk[]> {
  if (!index.chunks.length) return [];

  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const vector = queryEmbedding.data[0].embedding;
  const scored = index.embeddings.map((embedding, idx) => ({
    score: cosineSimilarity(vector, embedding),
    chunk: index.chunks[idx],
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);
}
