'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface RootLayoutClientProps {
  children: ReactNode;
  geistSans: string;
  geistMono: string;
}

export default function RootLayoutClient({ children, geistSans, geistMono }: RootLayoutClientProps) {
  const pathname = usePathname();
  const isToolPage = pathname === '/tool';

  return (
    <body className={`${geistSans} ${geistMono} antialiased min-h-screen ${isToolPage ? 'bg-cover bg-center bg-fixed transition-[background-image] duration-500' : 'bg-white'}`}>
      <div className="border-12 p-3 border-white min-h-screen">
        <div className="rounded-[24px] min-h-screen">
          <header className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
            <Link href="/" className="text-lg font-medium hover:text-gray-600 transition-colors">
              Photography Prompt
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/tool" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Prompt Builder
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          {children}
        </div>
      </div>
    </body>
  );
}