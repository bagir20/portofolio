import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
