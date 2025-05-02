'use client';

import PromptBuilder from '@/components/PromptBuilder';

export default function ToolContent() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </div>
  );
}