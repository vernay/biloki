export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@biloki.fr';
export const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '0964180069';
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/app/biloki/VOTRE_APP_ID';
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? 'https://play.google.com/store/apps/details?id=com.biloki.app';

// Webapp URLs
export const WEBAPP_BASE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'https://beta.biloki.fr';
export const WEBAPP_LOGIN_URL = `${WEBAPP_BASE_URL}/login`;
export const WEBAPP_REGISTER_URL = `${WEBAPP_BASE_URL}/register`;

// Server-side only
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
