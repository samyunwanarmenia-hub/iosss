export const DEFAULT_SITE_URL = 'https://samyun-wan.life';
const DEFAULT_QR_VERIFICATION_URL = 'https://qr-wan.netlify.app/';

// Vite uses import.meta.env, but we'll use defaults for now
const rawSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();
const normalizedSiteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : undefined;
const rawQrVerificationUrl = (import.meta.env.VITE_QR_VERIFICATION_URL as string | undefined)?.trim();

const normalizeUrlWithTrailingSlash = (url: string): string => `${url.replace(/\/+$/, '')}/`;

// Skip check for Vite - use defaults

export const SITE_URL = normalizedSiteUrl && normalizedSiteUrl.length > 0 ? normalizedSiteUrl : DEFAULT_SITE_URL;
const resolvedQrUrl =
  rawQrVerificationUrl && rawQrVerificationUrl.length > 0
    ? normalizeUrlWithTrailingSlash(rawQrVerificationUrl)
    : normalizeUrlWithTrailingSlash(DEFAULT_QR_VERIFICATION_URL);

export const QR_VERIFICATION_URL = resolvedQrUrl;
export const QR_VERIFICATION_REL = 'noopener noreferrer nofollow';

const DEFAULT_PRIMARY_PHONE = '+37495653666';
const DEFAULT_SECONDARY_PHONE = '+37496653666';
const rawPrimaryPhone = (import.meta.env.VITE_PRIMARY_PHONE as string | undefined)?.trim();
const rawSecondaryPhone = (import.meta.env.VITE_SECONDARY_PHONE as string | undefined)?.trim();
export const PRIMARY_PHONE =
  rawPrimaryPhone && rawPrimaryPhone.length > 0 ? rawPrimaryPhone : DEFAULT_PRIMARY_PHONE;
export const SECONDARY_PHONE =
  rawSecondaryPhone && rawSecondaryPhone.length > 0 ? rawSecondaryPhone : DEFAULT_SECONDARY_PHONE;

const DEFAULT_CONTACT_ADDRESS = '1 Teryan St, Yerevan, Armenia<br />(Citadel Office)';
const DEFAULT_CONTACT_HOURS = 'Mon - Sat: 9:00 - 23:00<br />Sunday: 10:00 - 18:00';
const rawContactAddress = (import.meta.env.VITE_CONTACT_ADDRESS_HTML as string | undefined)?.trim();
const rawContactHours = (import.meta.env.VITE_CONTACT_HOURS_HTML as string | undefined)?.trim();
export const CONTACT_ADDRESS_HTML =
  rawContactAddress && rawContactAddress.length > 0 ? rawContactAddress : DEFAULT_CONTACT_ADDRESS;
export const CONTACT_HOURS_HTML =
  rawContactHours && rawContactHours.length > 0 ? rawContactHours : DEFAULT_CONTACT_HOURS;

const DEFAULT_PRIVACY_VERSION = '1.0.0';
const DEFAULT_PRIVACY_EFFECTIVE_DATE = '2025-06-24';
const rawPrivacyVersion = (import.meta.env.VITE_PRIVACY_VERSION as string | undefined)?.trim();
const rawPrivacyEffectiveDate = (import.meta.env.VITE_PRIVACY_EFFECTIVE_DATE as string | undefined)?.trim();
export const PRIVACY_POLICY_VERSION =
  rawPrivacyVersion && rawPrivacyVersion.length > 0 ? rawPrivacyVersion : DEFAULT_PRIVACY_VERSION;
export const PRIVACY_EFFECTIVE_DATE =
  rawPrivacyEffectiveDate && rawPrivacyEffectiveDate.length > 0
    ? rawPrivacyEffectiveDate
    : DEFAULT_PRIVACY_EFFECTIVE_DATE;

export const OFFICIAL_BUSINESS_NAME = '«САМЮН ВАН АРМЕНИЯ» Центр снижения и набора веса';
export const DIRECTOR_NAME = 'Александр Геворкян';
export const OFFICIAL_ACTIVITY =
  'Представитель торговой марки «Samyun Wan» — консультации и сопровождение по снижению и набору веса';
export const OFFICIAL_CLASSIFICATION =
  'Spyur классификатор: Компании и НКО → Здравоохранение → Коррекция веса';
export const OFFICIAL_CITY = 'Армения, Ереван';
export const OFFICIAL_REGISTRY_LAST_UPDATE = '24.06.2025';
