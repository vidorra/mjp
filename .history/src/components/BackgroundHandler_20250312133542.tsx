'use client';

import { usePathname } from 'next/navigation';

export default function BackgroundHandler() {
  const pathname = usePathname();
  
  if (pathname === '/tool') {
    return (
      <style jsx global>{`
        body {
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          transition: background-image 500ms;
        }
      `}</style>
    );
  }
  
  return null;
}