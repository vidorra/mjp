'use client';

import dynamic from 'next/dynamic';
import { useBackground } from '@/contexts/BackgroundContext';

const PromptBuilder = dynamic(() => import('@/components/PromptBuilder'), {
  ssr: false
});

export default function ToolPage() {
  const { currentBackground } = useBackground();

  return (
    <main
      className="min-h-screen p-4 flex justify-center"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full">
        <PromptBuilder />
      </div>
    </main>
  );
}