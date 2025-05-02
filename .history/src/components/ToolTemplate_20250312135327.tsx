'use client';

import { ReactNode } from 'react';

interface ToolTemplateProps {
  children: ReactNode;
}

export default function ToolTemplate({ children }: ToolTemplateProps) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}