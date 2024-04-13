import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import data, { getColors } from "@/data";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: `${data.about?.name}`,
  description: data.about?.summary,
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={getColors()}
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
