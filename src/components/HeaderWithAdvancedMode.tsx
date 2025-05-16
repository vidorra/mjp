'use client';

import Link from 'next/link';
import Navigation from './Navigation';
import { useAdvancedMode } from '../contexts/AdvancedModeContext';

export default function HeaderWithAdvancedMode() {
  const { isAdvancedMode } = useAdvancedMode();

  // Calculate the header width based on the advanced mode state
  // When in advanced mode, the header should be smaller to match the wider content
  const headerWidthClass = isAdvancedMode
    ? "md:w-[calc(100%-1080px)]" // 720px + 50% = 1080px (header is smaller)
    : "md:w-[calc(100%-720px)]"; // Standard width

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] bg-[#fcf4e9] ${headerWidthClass} transition-all duration-300`}>
      <div className="flex items-center mx-4 md:mx-6 my-5 justify-between">
        <Link href="/" className="text-lg font-medium hover:text-gray-600 transition-colors">
          Photography Prompt
        </Link>
        <Navigation />
      </div>
    </header>
  );
}