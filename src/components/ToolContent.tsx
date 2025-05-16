'use client';

import PromptBuilder from '@/components/PromptBuilder';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';

export default function ToolContent() {
  const { isAdvancedMode } = useAdvancedMode();
  
  // Calculate the content width based on the advanced mode state
  // When in advanced mode, the content is 50% wider
  const contentWidthClass = isAdvancedMode
    ? "max-w-[calc(100%-480px)]" // 720px - 240px = 480px (content is 50% wider)
    : "max-w-[calc(100%-720px)]"; // Standard width

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      <main className="container mx-auto px-4 py-8">
        <div className={`${contentWidthClass} mx-auto transition-all duration-300`}>
          <PromptBuilder />
        </div>
      </main>
    </div>
  );
}