import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const messages = await import(`../../messages/${locale}.json`)
    .then(module => module.default)
    .catch(() => null);

  if (!messages) return null;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
