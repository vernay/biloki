#!/usr/bin/env node
/**
 * Compresse et redimensionne en place toutes les images raster de public/images
 * (et public/images/logo-partenaires, etc.) pour réduire drastiquement leur poids
 * sans changer ni le chemin ni le nom de fichier (donc sans casser les références
 * dans le code). Les fichiers SVG, vidéos et fichiers déjà légers sont ignorés.
 */
import fg from 'fast-glob';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const customGlob = process.argv[2];
const TARGETS = [customGlob || 'public/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}'];
const MAX_WIDTH = 2048;
const MIN_SIZE_TO_PROCESS = 80 * 1024; // 80 Ko : en dessous, le gain est négligeable

async function processFile(file) {
  const abs = path.join(ROOT, file);
  const before = (await fs.stat(abs)).size;
  if (before < MIN_SIZE_TO_PROCESS) return null;

  const ext = path.extname(file).toLowerCase();
  const tmp = abs + '.tmp';

  let pipeline = sharp(abs, { failOn: 'none' }).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality: 85, compressionLevel: 9, palette: true, effort: 8 });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 78, effort: 4 });
  } else {
    return null;
  }

  try {
    await pipeline.toFile(tmp);
  } catch (err) {
    await fs.rm(tmp, { force: true });
    return { file, before, after: before, skipped: true, error: String(err) };
  }

  const after = (await fs.stat(tmp)).size;

  if (after < before) {
    await fs.rename(tmp, abs);
    return { file, before, after, skipped: false };
  } else {
    await fs.rm(tmp, { force: true });
    return { file, before, after: before, skipped: true };
  }
}

async function main() {
  const files = await fg(TARGETS, { cwd: ROOT, dot: false });
  console.log(`${files.length} fichiers trouvés.`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;
  const errors = [];

  for (const file of files) {
    const result = await processFile(file);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    if (result.skipped) {
      skipped++;
      if (result.error) errors.push({ file, error: result.error });
    } else {
      processed++;
      const pct = (100 * (1 - result.after / result.before)).toFixed(0);
      console.log(
        `✓ ${file}  ${(result.before / 1024).toFixed(0)}Ko → ${(result.after / 1024).toFixed(0)}Ko (-${pct}%)`
      );
    }
  }

  console.log('\n--- Résumé ---');
  console.log(`Traités: ${processed}, ignorés: ${skipped}`);
  console.log(`Avant: ${(totalBefore / 1024 / 1024).toFixed(1)} Mo`);
  console.log(`Après: ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`);
  console.log(
    `Gain: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`
  );
  if (errors.length) {
    console.log('\nErreurs:');
    errors.forEach((e) => console.log(` - ${e.file}: ${e.error}`));
  }
}

main();
