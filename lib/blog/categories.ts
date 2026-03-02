export const categoryTranslations: Record<string, Record<string, string>> = {
  tips: {
    fr: 'Conseils',
    en: 'Tips',
    es: 'Consejos',
    pt: 'Dicas',
  },
  event: {
    fr: 'Événement',
    en: 'Event',
    es: 'Evento',
    pt: 'Evento',
  },
  guide: {
    fr: 'Guide',
    en: 'Guide',
    es: 'Guía',
    pt: 'Guia',
  },
  automation: {
    fr: 'Automatisation',
    en: 'Automation',
    es: 'Automatización',
    pt: 'Automação',
  },
  technology: {
    fr: 'Technologie',
    en: 'Technology',
    es: 'Tecnología',
    pt: 'Tecnologia',
  },
  regulation: {
    fr: 'Réglementation',
    en: 'Regulation',
    es: 'Normativa',
    pt: 'Regulamentação',
  },
};

export function translateCategory(category: string, locale: string): string {
  return categoryTranslations[category]?.[locale] ?? category;
}
