import PromptBuilder from '@/components/PromptBuilder';
import BackgroundContainer from '@/components/BackgroundContainer';

export default function ToolPage() {
  return (
    <BackgroundContainer>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </BackgroundContainer>
  );
}