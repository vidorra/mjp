'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-6">
        <li>
          <Link 
            href="/" 
            className={`transition-colors ${
              pathname === '/'
                ? 'text-primary font-medium'
                : 'text-foreground font-medium hover:text-primary'
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/tool" 
            className={`transition-colors ${
              pathname === '/tool'
                ? 'text-primary font-medium'
                : 'text-foreground font-medium hover:text-primary'
            }`}
          >
            Prompt Builder
          </Link>
        </li>
      </ul>
    </nav>
  );
}