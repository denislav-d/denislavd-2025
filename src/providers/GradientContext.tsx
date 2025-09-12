"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GradientContextType {
  isGradientEnabled: boolean;
  toggleGradient: () => void;
}

const GradientContext = createContext<GradientContextType | undefined>(
  undefined,
);

export function GradientProvider({ children }: { children: ReactNode }) {
  const [isGradientEnabled, setIsGradientEnabled] = useState(false);

  const toggleGradient = () => {
    setIsGradientEnabled(!isGradientEnabled);
  };

  return (
    <GradientContext.Provider value={{ isGradientEnabled, toggleGradient }}>
      {children}
    </GradientContext.Provider>
  );
}

export function useGradient() {
  const context = useContext(GradientContext);
  if (context === undefined) {
    throw new Error("useGradient must be used within a GradientProvider");
  }
  return context;
}
