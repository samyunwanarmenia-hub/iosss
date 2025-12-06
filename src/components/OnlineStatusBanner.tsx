'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import type { NetworkStatus } from '@capacitor/network';
import type { AppState } from '@capacitor/app';
import { getNetworkStatus, listenNetworkStatus, subscribeAppState, hapticImpact } from '@/native/bridge';

const bannerStyle: CSSProperties = {
  position: 'fixed',
  top: 12,
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#ef4444',
  color: '#ffffff',
  padding: '10px 16px',
  borderRadius: 999,
  boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
  zIndex: 9999,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 0.2,
};

const OnlineStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [appActive, setAppActive] = useState(true);

  useEffect(() => {
    const applyStatus = (nextOnline: boolean) => {
      setIsOnline(nextOnline);
      if (!nextOnline) {
        hapticImpact('light').catch(() => null);
      }
    };

    const syncInitial = async () => {
      try {
        const status = await getNetworkStatus();
        applyStatus(!!status.connected);
      } catch {
        applyStatus(typeof navigator !== 'undefined' ? navigator.onLine : true);
      }
    };

    const networkHandler = listenNetworkStatus((status: NetworkStatus) => applyStatus(!!status.connected));
    const onlineHandler = () => applyStatus(true);
    const offlineHandler = () => applyStatus(false);
    const appHandler = subscribeAppState((state: AppState) => setAppActive(state.isActive ?? true));

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    syncInitial();

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
      networkHandler?.();
      appHandler?.();
    };
  }, []);

  if (isOnline || !appActive) return null;

  return <div style={bannerStyle}>Offline mode: content may be limited</div>;
};

export default OnlineStatusBanner;
