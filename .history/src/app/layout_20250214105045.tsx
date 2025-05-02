// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
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
        <BackgroundProvider>
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}