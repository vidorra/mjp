'use client';

import PromptBuilder from '@/components/PromptBuilder';
import { usePathname } from 'next/navigation';

export default function ToolPage() {
  const pathname = usePathname();
  const isToolPage = pathname === '/tool';

  return (
    <div className={`${isToolPage ? 'bg-cover bg-center bg-fixed transition-[background-image] duration-500' : ''}`}>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </div>
  );
}