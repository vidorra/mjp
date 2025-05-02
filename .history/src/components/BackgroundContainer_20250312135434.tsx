'use client';

import { ReactNode } from 'react';

interface BackgroundContainerProps {
  children: ReactNode;
}

export default function BackgroundContainer({ children }: BackgroundContainerProps) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed transition-[background-image] duration-500">
      {children}
    </div>
  );
}