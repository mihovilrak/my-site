import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/request';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
