'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (path: string) => `transition-colors ${
    pathname === path
      ? 'text-primary font-medium'
      : 'text-foreground font-medium hover:text-primary'
  }`;

  return (
    <nav className="relative">
      {/* Hamburger button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
        <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
        <div className="w-6 h-0.5 bg-foreground"></div>
      </button>

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/tool" className={linkClass('/tool')}>
            Prompt Builder
          </Link>
        </li>
      </ul>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-full right-0 mt-2 py-2 px-4 bg-background border rounded-lg shadow-lg">
          <li className="mb-2">
            <Link
              href="/"
              className={linkClass('/')}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tool"
              className={linkClass('/tool')}
              onClick={() => setIsOpen(false)}
            >
              Prompt Builder
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}