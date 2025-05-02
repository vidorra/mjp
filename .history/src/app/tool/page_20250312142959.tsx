'use client';

import dynamic from 'next/dynamic';

const PromptBuilder = dynamic(() => import('@/components/PromptBuilder'), {
  ssr: false
});

export default function ToolPage() {
  return (
    <main className="BgSuggestion min-h-screen p-4 flex justify-end">
      <div className="w-full max-w-[640px]">
        <PromptBuilder />
      </div>
    </main>
  );
}