"use client";

import { useVisitTracker } from '@/hooks/useVisitTracker';

const VisitTrackerWrapper = () => {
  useVisitTracker();
  return null; // Этот компонент ничего не отображает
};

export default VisitTrackerWrapper;