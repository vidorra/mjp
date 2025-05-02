'use client';

import { useEffect } from 'react';
import PromptBuilder from '@/components/PromptBuilder';

export default function ToolPage() {
  useEffect(() => {
    document.body.classList.add('bg-cover', 'bg-center', 'bg-fixed', 'transition-[background-image]', 'duration-500');
    return () => {
      document.body.classList.remove('bg-cover', 'bg-center', 'bg-fixed', 'transition-[background-image]', 'duration-500');
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-[calc(100%-720px)] mx-auto">
        <PromptBuilder />
      </div>
    </main>
  );
}