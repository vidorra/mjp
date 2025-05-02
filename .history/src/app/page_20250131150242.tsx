'use client';

import dynamic from 'next/dynamic'

const PromptBuilder = dynamic(() => import('@/components/PromptBuilder'), {
  ssr: false
})



export default function Home() {
  return (
    <main className="min-h-screen p-4 flex justify-end">
      <div className="w-full max-w-[640px]">
          <PromptBuilder />
      </div>
    </main>
  );
}