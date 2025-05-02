import PromptBuilder from '@/components/PromptBuilder';
import ToolWrapper from '@/components/ToolWrapper';

export default function ToolPage() {
  return (
    <ToolWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </ToolWrapper>
  );
}