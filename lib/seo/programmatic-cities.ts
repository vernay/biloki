import fs from 'fs';
import path from 'path';

export interface ProgrammaticCityPage {
  slug: string;
  city: string;
  region: string;
  heroTitle: string;
  heroDescription: string;
  painPoints: string[];
  outcomes: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'lib/seo/programmatic-cities-data.json');
let cachedProgrammaticCityPages: ProgrammaticCityPage[] | null = null;

function loadProgrammaticCityPages(): ProgrammaticCityPage[] {
  if (cachedProgrammaticCityPages) {
    return cachedProgrammaticCityPages;
  }

  const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  cachedProgrammaticCityPages = JSON.parse(rawData) as ProgrammaticCityPage[];
  return cachedProgrammaticCityPages;
}

export function getProgrammaticCityPageFr(slug: string): ProgrammaticCityPage | undefined {
  return loadProgrammaticCityPages().find((page) => page.slug === slug);
}

export function getProgrammaticCitySlugsFr(): string[] {
  return loadProgrammaticCityPages().map((page) => page.slug);
}
