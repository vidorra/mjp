// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import "./globals.css";
import "../styles/fontawesome.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";
import { AdvancedModeProvider } from "../contexts/AdvancedModeContext";
import Navigation from '../components/Navigation';
import HeaderWithAdvancedMode from '../components/HeaderWithAdvancedMode';

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
      <head></head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500`}
      >
        <AdvancedModeProvider>
          <HeaderWithAdvancedMode />
          <BackgroundProvider>
            {children}
          </BackgroundProvider>
        </AdvancedModeProvider>
      </body>
    </html>
  );
}