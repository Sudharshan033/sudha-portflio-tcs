import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sudha Paardevan - Portfolio",
  description: "Strategic HR Leader & Workforce Transformation Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.theme;
                if (t !== 'light' && t !== 'dark') {
                  t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                }
                var r = document.documentElement;
                r.setAttribute('data-theme', t);
                r.classList.toggle('dark', t === 'dark');
                r.classList.toggle('light', t === 'light');
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${interFont.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
