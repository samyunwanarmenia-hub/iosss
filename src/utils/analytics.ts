import { AnalyticsEvent } from '@/types/global';

const GOOGLE_ADS_ID = 'AW-17742658374';
const GOOGLE_ADS_PURCHASE_LABEL = 'jClQCPS06cMbEMb2rYxC';

const ensureDataLayer = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
};

export const trackGAEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', event.action, payload);
    return;
  }

  ensureDataLayer();
  window.dataLayer.push({
    event: event.action,
    ...payload,
  });
};

export const trackGoogleAdsConversion = ({
  value,
  currency = 'AMD',
  label = GOOGLE_ADS_PURCHASE_LABEL,
  transactionId,
}: {
  value?: number;
  currency?: string;
  label?: string;
  transactionId?: string;
}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const sendTo = GOOGLE_ADS_ID && label ? `${GOOGLE_ADS_ID}/${label}` : undefined;
  if (!sendTo) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value,
      currency,
      transaction_id: transactionId,
    });
    return;
  }

  ensureDataLayer();
  window.dataLayer.push({
    event: 'conversion',
    send_to: sendTo,
    value,
    currency,
    transaction_id: transactionId,
  });
};
