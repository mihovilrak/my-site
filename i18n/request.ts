import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'hr', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export const localePrefix = 'as-needed' as const;

export type LocalePrefix = typeof localePrefix;

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  const headersList = await headers();
  const currentLocale = headersList.get('x-next-intl-locale') || defaultLocale;
  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
    timeZone: 'Europe/Zagreb'
  };
});
