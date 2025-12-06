"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;

export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasWarnedRef = useRef(false);
  const searchParamsString = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID) {
      if (!hasWarnedRef.current) {
        console.warn('NEXT_PUBLIC_GA_ID is not configured. Google Analytics is disabled.');
        hasWarnedRef.current = true;
      }
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function (...args: unknown[]) {
        window.dataLayer.push(args);
      };
    }

    if (!pathname) {
      return;
    }

    const fullPath = searchParamsString ? `${pathname}?${searchParamsString}` : pathname;

    const sendPageView = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const payload = {
        page_path: fullPath,
        page_location: window.location.href,
        page_title: document.title,
      };

      if (typeof window.gtag === 'function') {
        window.gtag('config', GOOGLE_ANALYTICS_ID, payload);
        window.gtag('event', 'page_view', payload);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'page_view',
          ...payload,
        });
      }
    };

    // Use requestIdleCallback when available to avoid blocking user interactions during navigation changes.
    if ('requestIdleCallback' in window && window.requestIdleCallback) {
      const handle = window.requestIdleCallback(sendPageView, { timeout: 2000 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(handle);
    }

    const timeoutId = window.setTimeout(sendPageView, 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, searchParamsString]);
};
