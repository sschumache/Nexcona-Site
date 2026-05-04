export const i18n = {
  defaultLocale: 'de-CH',
  locales: ['en', 'de-CH'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
