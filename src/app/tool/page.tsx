'use client';

import dynamic from 'next/dynamic';
import { useBackground } from '@/contexts/BackgroundContext';

const ToolContent = dynamic(() => import('@/components/ToolContent'), {
  ssr: false
});

export default function ToolPage() {
  const { currentBackground } = useBackground();

  return (
    <main
      className="min-h-screen flex justify-end w-full"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <ToolContent />
    </main>
  );
}