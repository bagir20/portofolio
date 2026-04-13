import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ["id", "en"];

export const metadata: Metadata = {
  title: "Muhammad Bagir — System & Web Developer",
  description:
    "Portfolio of Muhammad Bagir — Fresh Graduate Sistem Informasi dengan pengalaman pengembangan aplikasi berbasis web dan pengelolaan data.",
  keywords: [
    "portfolio",
    "Muhammad Bagir",
    "web developer",
    "Sistem Informasi",
    "React",
    "Next.js",
  ],
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Muhammad Bagir — System & Web Developer",
    description:
      "Fresh Graduate Sistem Informasi dengan pengalaman pengembangan aplikasi berbasis web dan pengelolaan data.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}