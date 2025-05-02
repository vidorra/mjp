// app/BackgroundContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { findMatchingImage } from '../lib/backgroundData';

type BackgroundContextType = {
  currentBackground: string;
  updateBackground: (style?: string, shotType?: string, category?: string, subcategory?: string, lighting?: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType>({
  currentBackground: '/bg.webp',
  updateBackground: () => {},
});

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [currentBackground, setCurrentBackground] = useState('/bg.webp');

  const updateBackground = (
    style?: string,
    shotType?: string,
    category?: string,
    subcategory?: string,
    lighting?: string
  ) => {
    const matchingImage = findMatchingImage(style, shotType, category, subcategory, lighting);
    if (matchingImage) {
      setCurrentBackground(`/${matchingImage.filename}`);
    }
  };

  // No longer applying background to body

  return (
    <BackgroundContext.Provider value={{ currentBackground, updateBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackground = () => useContext(BackgroundContext);