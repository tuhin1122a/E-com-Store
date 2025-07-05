import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

import { Footer } from "@/components/footer";
import Header from "@/components/home/header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcomStore - Your Online Shopping Destination",
  description:
    "Discover amazing products with unbeatable prices and fast shipping. Shop electronics, clothing, home goods and more.",
  keywords:
    "ecommerce, online shopping, electronics, clothing, home goods, deals",
  authors: [{ name: "EcomStore Team" }],
  openGraph: {
    title: "EcomStore - Your Online Shopping Destination",
    description:
      "Discover amazing products with unbeatable prices and fast shipping.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcomStore - Your Online Shopping Destination",
    description:
      "Discover amazing products with unbeatable prices and fast shipping.",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
