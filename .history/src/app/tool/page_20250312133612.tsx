import PromptBuilder from '@/components/PromptBuilder';
import styles from './page.module.css';

export default function ToolPage() {
  return (
    <div className={styles.toolPage}>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-[calc(100%-720px)] mx-auto">
          <PromptBuilder />
        </div>
      </main>
    </div>
  );
}