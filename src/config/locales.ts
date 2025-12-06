export const SUPPORTED_LANGS = ['hy', 'ru', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = 'hy';

export const LOCALE_CODES: Record<SupportedLang, string> = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US',
};

export const isSupportedLang = (value?: string): value is SupportedLang =>
  !!value && SUPPORTED_LANGS.includes(value as SupportedLang);

export const resolveLang = (value?: string): SupportedLang =>
  isSupportedLang(value) ? (value as SupportedLang) : DEFAULT_LANG;
