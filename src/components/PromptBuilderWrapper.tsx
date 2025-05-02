'use client';

import PromptBuilder from '@/components/PromptBuilder';

export default function PromptBuilderWrapper() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      <main className="container ml-auto pr-4 py-8">
        <div className="max-w-[calc(100%-720px)] ml-auto">
          <PromptBuilder />
        </div>
      </main>
    </div>
  );
}