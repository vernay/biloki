#!/usr/bin/env node
/**
 * Recompresse les images raster embarquées en base64 à l'intérieur des fichiers
 * SVG (souvent des captures d'écran exportées avec une photo plein format encodée
 * en data URI). Le SVG reste un SVG, au même chemin : aucune référence dans le
 * code n'a besoin de changer. Le visuel final est identique puisque l'élément
 * <image> est de toute façon redimensionné par ses attributs width/height et sa
 * transformation — seule la résolution interne, inutilement élevée, est réduite.
 */
import fg from 'fast-glob';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const customGlob = process.argv[2];
const TARGETS = [customGlob || 'public/images/**/*.svg'];
const MAX_WIDTH = 1600;
const MIN_EMBED_SIZE = 50 * 1024; // on ignore les petites images/icônes embarquées

const DATA_URI_RE = /data:image\/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g;

async function recompressEmbedded(mime, buffer) {
  const img = sharp(buffer, { failOn: 'none' });
  const meta = await img.metadata();

  let pipeline = img.rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (meta.hasAlpha) {
    pipeline = pipeline.png({ quality: 85, compressionLevel: 9, palette: true, effort: 8 });
    return { mime: 'png', buffer: await pipeline.toBuffer() };
  }
  pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
  return { mime: 'jpeg', buffer: await pipeline.toBuffer() };
}

async function processFile(file) {
  const abs = path.join(ROOT, file);
  const before = (await fs.stat(abs)).size;
  const content = await fs.readFile(abs, 'utf-8');

  const matches = [...content.matchAll(DATA_URI_RE)];
  if (matches.length === 0) return null;

  let hasChanges = false;
  let result = '';
  let lastIndex = 0;

  for (const m of matches) {
    const [fullMatch, mime, b64] = m;
    const start = m.index;
    const raw = Buffer.from(b64, 'base64');

    result += content.slice(lastIndex, start);

    if (raw.length < MIN_EMBED_SIZE) {
      result += fullMatch;
    } else {
      try {
        const { mime: newMime, buffer } = await recompressEmbedded(mime, raw);
        if (buffer.length < raw.length) {
          result += `data:image/${newMime};base64,${buffer.toString('base64')}`;
          hasChanges = true;
        } else {
          result += fullMatch;
        }
      } catch {
        result += fullMatch;
      }
    }

    lastIndex = start + fullMatch.length;
  }
  result += content.slice(lastIndex);

  if (!hasChanges) return { file, before, after: before, skipped: true };

  await fs.writeFile(abs, result, 'utf-8');
  const after = (await fs.stat(abs)).size;
  return { file, before, after, skipped: false };
}

async function main() {
  const files = await fg(TARGETS, { cwd: ROOT, dot: false });
  console.log(`${files.length} fichiers SVG trouvés.`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await processFile(file);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    if (result.skipped) {
      skipped++;
    } else {
      processed++;
      const pct = (100 * (1 - result.after / result.before)).toFixed(0);
      console.log(
        `✓ ${file}  ${(result.before / 1024).toFixed(0)}Ko → ${(result.after / 1024).toFixed(0)}Ko (-${pct}%)`
      );
    }
  }

  console.log('\n--- Résumé SVG ---');
  console.log(`Traités: ${processed}, ignorés: ${skipped}`);
  console.log(`Avant: ${(totalBefore / 1024 / 1024).toFixed(1)} Mo`);
  console.log(`Après: ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`);
  if (totalBefore > 0) {
    console.log(`Gain: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
  }
}

main();
