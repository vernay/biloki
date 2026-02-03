/**
 * Configuration centralisée du design et des couleurs
 * Utilisé par: tous les composants pour la cohérence visuelle
 */

export const COLORS = {
  primary: '#04a4ff',      // Bleu Biloki
  primaryDark: '#0284c7',  // Bleu foncé (pour dégradés)
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const TAILWIND_COLORS = {
  primary: COLORS.primary,
  'primary-light': '#e0f2fe',
  'primary-dark': COLORS.primaryDark,
};

/**
 * Helper pour utiliser la couleur primaire dans les styles inline
 */
export const getPrimaryColor = () => COLORS.primary;
export const getPrimaryDarkColor = () => COLORS.primaryDark;
