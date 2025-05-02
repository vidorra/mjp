// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import "./globals.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";

export const metadata: Metadata = {
  title: "Photography Prompt Builder",
  description: "Create better prompts for photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`border-12 bg-white min-h-screen p-3 border-white`} lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased rounded-[24px] bg-cover bg-center bg-fixed transition-[background-image] duration-500`}
      >
        <header className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-gray-600 transition-colors">
            Photography Prompt
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/tool" 
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Prompt Builder
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <BackgroundProvider>
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}