'use client';

import React, { createContext, useContext, useState } from 'react';

type AdvancedModeContextType = {
  isAdvancedMode: boolean;
  setIsAdvancedMode: (value: boolean) => void;
};

const AdvancedModeContext = createContext<AdvancedModeContextType>({
  isAdvancedMode: false,
  setIsAdvancedMode: () => {},
});

export function AdvancedModeProvider({ children }: { children: React.ReactNode }) {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  return (
    <AdvancedModeContext.Provider value={{ isAdvancedMode, setIsAdvancedMode }}>
      {children}
    </AdvancedModeContext.Provider>
  );
}

export const useAdvancedMode = () => useContext(AdvancedModeContext);