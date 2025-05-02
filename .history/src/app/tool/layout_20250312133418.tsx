'use client';

import { useEffect } from 'react';

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Add background styles to body when component mounts
    document.body.classList.add('bg-cover', 'bg-center', 'bg-fixed', 'transition-[background-image]', 'duration-500');
    
    // Remove background styles when component unmounts
    return () => {
      document.body.classList.remove('bg-cover', 'bg-center', 'bg-fixed', 'transition-[background-image]', 'duration-500');
    };
  }, []);

  return <>{children}</>;
}