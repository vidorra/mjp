// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";
import Navigation from '../components/Navigation';

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
        <header className="fixed top-0 left-0 z-[1000] bg-background" style={{ width: 'calc(100% - 720px)' }}>
          <div className="max-w-7xl flex items-center mx-6 my-5 justify-between">
            <Link href="/" className="text-lg font-medium   hover:text-gray-600 transition-colors">
              Photography Prompt
            </Link>
            <Navigation />
          </div>
        </header>
        <BackgroundProvider>
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}