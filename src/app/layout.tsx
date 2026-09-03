import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import "./globals.css";

// Only two weights — Light for labels/body, Regular for headlines
const ibmPlexMonoLight = IBM_Plex_Mono({
  weight: "300",
  variable: "--font-ibm-plex-mono-light",
  subsets: ["latin"],
});

const ibmPlexMonoRegular = IBM_Plex_Mono({
  weight: "400",
  variable: "--font-ibm-plex-mono-regular",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudharshan - Portfolio",
  description: "Full Stack + Frontend Developer & UI/UX Designer",
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
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${ibmPlexMonoLight.variable} ${ibmPlexMonoRegular.variable} antialiased transition-colors duration-300`}
        style={{ fontFamily: "var(--font-ibm-plex-mono-light), monospace", fontWeight: 300 }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
