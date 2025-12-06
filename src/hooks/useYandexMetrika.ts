"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { SITE_URL } from '@/config/siteConfig';

const YANDEX_METRIKA_ID = 103962073;

const EXTRA_ALLOWED_HOSTS = (process.env.NEXT_PUBLIC_METRIKA_ALLOWED_HOSTS || '')
  .split(',')
  .map(host => host.trim().toLowerCase())
  .filter(Boolean);

const STATIC_ALLOWED_HOSTS = ['samyun-wan.life', 'www.samyun-wan.life'];

export const useYandexMetrika = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const defaultHost = (() => {
      try {
        return new URL(SITE_URL).hostname.toLowerCase();
      } catch {
        return null;
      }
    })();

    const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
    const allowedHostnames = new Set([...STATIC_ALLOWED_HOSTS, defaultHost, ...EXTRA_ALLOWED_HOSTS].filter(Boolean));
    const domainOk = hostname ? allowedHostnames.has(hostname) : false;

    if (typeof window !== 'undefined') {
      window.ym =
        window.ym ||
        function (...args: unknown[]) {
          (window.ym.a = window.ym.a || []).push(args);
        };
      window.ym.l = Date.now();
    }

    const injectYandexMetrikaScript = () => {
      if (typeof window === 'undefined' || document.getElementById('yandex-metrika-script')) {
        return;
      }
      if (!domainOk) {
        console.warn('Yandex Metrika skipped due to hostname mismatch', {
          hostname,
          allowedHostnames: Array.from(allowedHostnames),
        });
        return;
      }

      const script = document.createElement('script');
      script.id = 'yandex-metrika-script';
      script.async = true;
      script.defer = true;
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;
      script.onload = () => {
        window.ym?.(YANDEX_METRIKA_ID, 'init', {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: 'dataLayer',
          accurateTrackBounce: true,
          trackLinks: true,
        });
      };

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(injectYandexMetrikaScript, { timeout: 2000 });
      } else {
        setTimeout(injectYandexMetrikaScript, 3000);
      }
    }

    if (pathname !== null && domainOk && typeof window !== 'undefined' && typeof window.ym === 'function') {
      const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      window.ym(YANDEX_METRIKA_ID, 'hit', fullPath);
    }
  }, [pathname, searchParams]);
};
