import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { BackgroundProvider } from "../contexts/BackgroundContext";
import RootLayoutClient from "@/components/RootLayoutClient";

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
    <html lang="en">
      <RootLayoutClient 
        geistSans={GeistSans.variable}
        geistMono={GeistMono.variable}
      >
        <BackgroundProvider>
          {children}
        </BackgroundProvider>
      </RootLayoutClient>
    </html>
  );
}