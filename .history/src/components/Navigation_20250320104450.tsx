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
                ? 'text-black font-medium' 
                : 'text-gray-600 hover:text-black'
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
                ? 'text-black font-medium' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Prompt Builder
          </Link>
        </li>
      </ul>
    </nav>
  );
}