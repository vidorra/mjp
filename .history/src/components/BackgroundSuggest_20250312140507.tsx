'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface BackgroundSuggestProps {
  children: ReactNode;
}

export default function BackgroundSuggest({ children }: BackgroundSuggestProps) {
  const pathname = usePathname();
  const isToolPage = pathname === '/tool';

  return (
    <div className={isToolPage ? 'bg-cover bg-center bg-fixed transition-[background-image] duration-500' : ''}>
      {children}
    </div>
  );
}