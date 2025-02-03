import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { defaultLocale } from '../i18n/request';

export default async () => {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') || defaultLocale;
  redirect(`/${locale}`);
}
