// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import "./globals.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "Photography Prompt Builder",
  description: "Create better prompts for photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const isToolPage = headersList.get('x-page-type') === 'tool';

  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen ${isToolPage ? 'bg-cover bg-center bg-fixed transition-[background-image] duration-500' : 'bg-white'}`}>
        <div className="border-12 p-3 border-white min-h-screen">
          <div className="rounded-[24px] min-h-screen">
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
          </div>
        </div>
      </body>
    </html>
  );
}