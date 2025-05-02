// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import "./globals.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";

export const metadata: Metadata = {
  title: "Midjourney Prompt Builder",
  description: "Create better prompts for Midjourney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500`}
      >
        <header className="fixed top-0 left-0 z-[1000] bg-[#fcf4e9]" style={{ width: 'calc(100% - 720px)' }}>
          <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
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
          </div>
        </header>
        <BackgroundProvider>
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}