import PromptBuilder from '@/components/PromptBuilder';
import ToolPageWrapper from '@/components/ToolPageWrapper';

export default function ToolPage() {
  return (
    <ToolPageWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </ToolPageWrapper>
  );
}