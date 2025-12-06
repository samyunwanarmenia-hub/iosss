"use client";

import { useYandexMetrika } from '@/hooks/useYandexMetrika';

const YandexMetrikaTracker = () => {
  useYandexMetrika(); // Call the hook here

  return null; // This component doesn't render anything visible
};

export default YandexMetrikaTracker;