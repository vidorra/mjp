import PromptBuilder from '@/components/PromptBuilder';

export default async function ToolPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-[calc(100%-720px)] mx-auto">
        <PromptBuilder />
      </div>
    </main>
  );
}