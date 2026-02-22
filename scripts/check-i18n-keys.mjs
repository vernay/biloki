#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const MESSAGES_DIR = path.join(ROOT_DIR, 'messages');
const BASE_LOCALE = 'fr';
const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt'];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flattenKeys(value, prefix = '') {
  const keys = [];

  if (Array.isArray(value)) {
    if (value.length === 0) {
      keys.push(prefix);
      return keys;
    }

    value.forEach((item, index) => {
      const key = `${prefix}[${index}]`;
      if (item && typeof item === 'object') {
        keys.push(...flattenKeys(item, key));
      } else {
        keys.push(key);
      }
    });
    return keys;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0 && prefix) {
      keys.push(prefix);
      return keys;
    }

    entries.forEach(([entryKey, entryValue]) => {
      const key = prefix ? `${prefix}.${entryKey}` : entryKey;
      if (entryValue && typeof entryValue === 'object') {
        keys.push(...flattenKeys(entryValue, key));
      } else {
        keys.push(key);
      }
    });
    return keys;
  }

  if (prefix) {
    keys.push(prefix);
  }

  return keys;
}

function formatKeyList(title, items) {
  if (items.length === 0) {
    return `${title}: 0`;
  }

  const body = items.map((item) => `  - ${item}`).join('\n');
  return `${title}: ${items.length}\n${body}`;
}

function getLocales() {
  const available = new Set(
    fs
      .readdirSync(MESSAGES_DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace(/\.json$/, ''))
  );

  return SUPPORTED_LOCALES.filter((locale) => available.has(locale));
}

function main() {
  const locales = getLocales();

  if (!locales.includes(BASE_LOCALE)) {
    console.error(`Base locale \"${BASE_LOCALE}\" introuvable dans messages/.`);
    process.exit(1);
  }

  const basePath = path.join(MESSAGES_DIR, `${BASE_LOCALE}.json`);
  const baseMessages = readJson(basePath);
  const baseKeys = new Set(flattenKeys(baseMessages));

  let hasDiff = false;

  console.log(`Comparaison i18n (base: ${BASE_LOCALE})`);

  locales
    .filter((locale) => locale !== BASE_LOCALE)
    .forEach((locale) => {
      const currentPath = path.join(MESSAGES_DIR, `${locale}.json`);
      const currentMessages = readJson(currentPath);
      const currentKeys = new Set(flattenKeys(currentMessages));

      const missing = [...baseKeys].filter((key) => !currentKeys.has(key)).sort();
      const extra = [...currentKeys].filter((key) => !baseKeys.has(key)).sort();

      if (missing.length > 0 || extra.length > 0) {
        hasDiff = true;
      }

      console.log(`\n[${locale}]`);
      console.log(formatKeyList('Missing', missing));
      console.log(formatKeyList('Extra', extra));
    });

  if (hasDiff) {
    console.error('\nÉcarts détectés entre les fichiers de traduction.');
    process.exit(1);
  }

  console.log('\nToutes les locales sont alignées avec la base.');
}

main();