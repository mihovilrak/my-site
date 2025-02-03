import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { getMessages } from "@/lib/getMessages";

const LocaleLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const { locale } = params;
  const messages = getMessages(locale); // Fetch messages synchronously

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
              <main className="flex-grow">{children}</main>
            </div>
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;