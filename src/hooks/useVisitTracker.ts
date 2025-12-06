"use client";

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { notifyVisit } from '@/utils/telegramApi';
import { getDeviceInfo } from '@/utils/deviceInfo'; // Import the new utility

export const useVisitTracker = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const SESSION_KEY = 'samyunwan_visit_notified';
    const NOTIFICATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

    // NEW: Do not track general visits on the QR verification page
    if (pathname?.includes('/verify/qr')) {
      return;
    }

    const deferVisitTracking = setTimeout(() => {
      const lastNotified = sessionStorage.getItem(SESSION_KEY);
      const currentTime = new Date().getTime();

      if (!lastNotified || (currentTime - parseInt(lastNotified, 10) > NOTIFICATION_INTERVAL_MS)) {
        const sendDetailedVisitNotification = async () => {
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          // Get User-Agent details and client timezone using the new utility
          const { deviceVendor, deviceModel, cpuArchitecture, clientTimezone } = getDeviceInfo();

          const utmQueryParams = {
            utm_source: searchParams?.get('utm_source') || null,
            utm_medium: searchParams?.get('utm_medium') || null,
            utm_campaign: searchParams?.get('utm_campaign') || null,
          };

            const bodyData = {
              lat: null, 
              lon: null, 
              screenWidth, 
              screenHeight, 
              pagePath: pathname ?? '/',
              deviceVendor,
              deviceModel,
            cpuArchitecture,
            clientTimezone,
          };
          
          try {
            await notifyVisit(bodyData, utmQueryParams, true);
            sessionStorage.setItem(SESSION_KEY, currentTime.toString());
          } catch (error) {
            console.warn(
              "Could not send visit notification. This is expected if Telegram credentials are not set in your .env.local file. Error:",
              error
            );
          }
        };

        setTimeout(() => {
          sendDetailedVisitNotification();
        }, 0);
      }
    }, 5000);

    return () => {
      clearTimeout(deferVisitTracking);
    };
  }, [searchParams, pathname]);
};
