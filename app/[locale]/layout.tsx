import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { Metadata } from 'next';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  const locale = params.locale;
  return {
    title: 'Mihovil Rak - Portfolio',
    description: 'Personal website and portfolio'
  };
};

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  const messages = await import(`../../messages/${locale}.json`)
    .then(module => module.default)
    .catch(() => null);

  if (!messages) return null;

  return (
    <div>
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
    </div>
  );
}

export default Layout;