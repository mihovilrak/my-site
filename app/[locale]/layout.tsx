import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { getMessages } from "@/lib/getMessages";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const LocaleLayoutWrapper = async ({
  children,
  params,
}: LayoutProps) => {
  const resolvedParams = await params;
  const messages = await getMessages(resolvedParams.locale);

  return (
    <LocaleLayout locale={resolvedParams.locale} messages={messages}>
      {children}
    </LocaleLayout>
  );
}

// Separate component that is NOT async
const LocaleLayout = ({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string> | null;
}) => {
  if (!messages) return <div>Missing translations for {locale}</div>;

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
              <main className="flex-grow">{children}</main>
            </div>
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayoutWrapper;