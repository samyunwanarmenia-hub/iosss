'use client';

import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';

const styleMap = {
  light: ImpactStyle.Light,
  medium: ImpactStyle.Medium,
  heavy: ImpactStyle.Heavy,
};

export const isNative = Capacitor.isNativePlatform();

export async function openExternal(url) {
  if (!url) return;
  if (isNative) {
    await Browser.open({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export async function hapticImpact(style = 'medium') {
  if (!isNative) return;
  const impactStyle = styleMap[style] || ImpactStyle.Medium;
  try {
    await Haptics.impact({ style: impactStyle });
  } catch {
    // no-op on platforms without haptics
  }
}

export function subscribeAppState(callback) {
  if (typeof callback !== 'function' || !App?.addListener) return () => {};
  const listener = App.addListener('appStateChange', callback);
  return () => {
    listener?.remove?.();
  };
}

export function listenNetworkStatus(callback) {
  if (typeof callback !== 'function' || !Network?.addListener) return () => {};
  const listener = Network.addListener('networkStatusChange', callback);
  return () => {
    listener?.remove?.();
  };
}

export async function getNetworkStatus() {
  if (!Network?.getStatus) return { connected: typeof navigator !== 'undefined' ? navigator.onLine : true };
  try {
    return await Network.getStatus();
  } catch {
    return { connected: typeof navigator !== 'undefined' ? navigator.onLine : true };
  }
}

export async function notifyOfflineBanner() {
  await hapticImpact('light');
}
