"use client";

import { createContext, useContext } from 'react';
import { LayoutContextType } from '@/types/global';

// Create the context with an initial value of null
export const LayoutContext = createContext<LayoutContextType | null>(null);

// Custom hook for easy consumption of the context
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};