'use client';
import { useTranslations } from "next-intl"

const Error = () => {
  const t = useTranslations();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{t('error.error')}</h1>
        <p className="mt-4">{t('error.message')}</p>
      </div>
    </div>
  );
}

export default Error;