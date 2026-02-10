import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, '.cache');
const LEADS_FILE = path.join(CACHE_DIR, 'agent-leads.json');

export type LeadData = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  propertyCount?: number;
  city?: string;
  currentTools?: string[];
  painPoints?: string[];
  consent?: boolean;
};

export type LeadMessage = {
  role: 'user' | 'assistant';
  content: string;
  at: string;
};

export type LeadRecord = {
  sessionId: string;
  locale: string;
  lead: LeadData;
  messages: LeadMessage[];
  createdAt: string;
  updatedAt: string;
  followupDueAt?: string;
  followupSentAt?: string;
};

type LeadStore = {
  leads: Record<string, LeadRecord>;
};

async function readStore(): Promise<LeadStore> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as LeadStore;
    if (parsed && parsed.leads) return parsed;
    return { leads: {} };
  } catch {
    return { leads: {} };
  }
}

async function writeStore(store: LeadStore) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(store));
}

export async function recordChatSession(params: {
  sessionId: string;
  locale: string;
  userMessage: string;
  assistantMessage: string;
  lead?: LeadData;
}) {
  const { sessionId, locale, userMessage, assistantMessage, lead } = params;
  const store = await readStore();
  const now = new Date().toISOString();

  const existing = store.leads[sessionId];
  const record: LeadRecord = existing
    ? {
        ...existing,
        locale,
        lead: { ...existing.lead, ...(lead || {}) },
        messages: [...existing.messages],
        updatedAt: now,
      }
    : {
        sessionId,
        locale,
        lead: { ...(lead || {}) },
        messages: [],
        createdAt: now,
        updatedAt: now,
      };

  record.messages.push({ role: 'user', content: userMessage, at: now });
  if (assistantMessage) {
    record.messages.push({ role: 'assistant', content: assistantMessage, at: now });
  }

  if (record.lead.email && !record.followupSentAt) {
    const due = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    record.followupDueAt = due;
  }

  store.leads[sessionId] = record;
  await writeStore(store);
}

export async function listDueFollowups(now = new Date()): Promise<LeadRecord[]> {
  const store = await readStore();
  const nowMs = now.getTime();

  return Object.values(store.leads).filter((lead) => {
    if (!lead.lead.email) return false;
    if (lead.lead.consent !== true) return false;
    if (lead.followupSentAt) return false;
    if (!lead.followupDueAt) return false;
    return new Date(lead.followupDueAt).getTime() <= nowMs;
  });
}

export async function markFollowupSent(sessionId: string, sentAt = new Date()) {
  const store = await readStore();
  const record = store.leads[sessionId];
  if (!record) return;
  record.followupSentAt = sentAt.toISOString();
  record.updatedAt = sentAt.toISOString();
  store.leads[sessionId] = record;
  await writeStore(store);
}
