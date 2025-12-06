'use client';

import { useEffect } from 'react';

const swPath = process.env.NEXT_PUBLIC_SW_PATH || '/service-worker.js';
const swScope = process.env.NEXT_PUBLIC_SW_SCOPE || '/';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register(swPath, { scope: swScope });
      } catch (error) {
        console.warn('[sw] registration failed', error);
      }
    };

    register();
  }, []);

  return null;
};

export default ServiceWorkerRegistration;
