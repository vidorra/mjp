'use client';

import PromptBuilder from '@/components/PromptBuilder';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';

export default function ToolContent() {
  const { isAdvancedMode, setIsAdvancedMode } = useAdvancedMode();
  
  // Calculate the content width based on the advanced mode state
  // When in advanced mode, the content is 50% wider
  const contentWidthClass = isAdvancedMode
    ? "max-w-[calc(100%-480px)]" // 720px - 240px = 480px (content is 50% wider)
    : "max-w-[calc(100%-720px)]"; // Standard width

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      <main className="container mx-auto px-4 py-8">
        <div className="w-full flex">
          <div className="flex-grow pt-[52px]">
            <div className="bg-[#fcf4e9] rounded-[24px] inline-flex p-1 m-4">
              <button
                onClick={() => setIsAdvancedMode(false)}
                className={`px-4 py-3 text-sm transition-colors font-medium ${!isAdvancedMode ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Basic Mode
              </button>
              <button
                onClick={() => setIsAdvancedMode(true)}
                className={`px-4 py-3 text-sm transition-colors font-medium ${isAdvancedMode ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Advanced Mode
              </button>
            </div>
          </div>
          <div className={`space-y-6 ${isAdvancedMode ? 'max-w-[1032px]' : 'max-w-[688px]'} transition-all duration-300`}>
            <PromptBuilder />
          </div>
        </div>
      </main>
    </div>
  );
}