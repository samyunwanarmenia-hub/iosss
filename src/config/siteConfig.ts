export const DEFAULT_SITE_URL = 'https://samyun-wan.life';
const DEFAULT_QR_VERIFICATION_URL = 'https://qr-wan.netlify.app/';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const normalizedSiteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/+$/, '') : undefined;
const rawQrVerificationUrl = process.env.NEXT_PUBLIC_QR_VERIFICATION_URL?.trim();

const normalizeUrlWithTrailingSlash = (url: string): string => `${url.replace(/\/+$/, '')}/`;

if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !normalizedSiteUrl) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL must be defined with the public production domain (e.g. https://example.com).',
  );
}

export const SITE_URL = normalizedSiteUrl && normalizedSiteUrl.length > 0 ? normalizedSiteUrl : DEFAULT_SITE_URL;
const resolvedQrUrl =
  rawQrVerificationUrl && rawQrVerificationUrl.length > 0
    ? normalizeUrlWithTrailingSlash(rawQrVerificationUrl)
    : normalizeUrlWithTrailingSlash(DEFAULT_QR_VERIFICATION_URL);

export const QR_VERIFICATION_URL = resolvedQrUrl;
export const QR_VERIFICATION_REL = 'noopener noreferrer nofollow';

const DEFAULT_PRIMARY_PHONE = '+37495653666';
const DEFAULT_SECONDARY_PHONE = '+37496653666';
const rawPrimaryPhone = process.env.NEXT_PUBLIC_PRIMARY_PHONE?.trim();
const rawSecondaryPhone = process.env.NEXT_PUBLIC_SECONDARY_PHONE?.trim();
export const PRIMARY_PHONE =
  rawPrimaryPhone && rawPrimaryPhone.length > 0 ? rawPrimaryPhone : DEFAULT_PRIMARY_PHONE;
export const SECONDARY_PHONE =
  rawSecondaryPhone && rawSecondaryPhone.length > 0 ? rawSecondaryPhone : DEFAULT_SECONDARY_PHONE;

const DEFAULT_CONTACT_ADDRESS = '1 Teryan St, Yerevan, Armenia<br />(Citadel Office)';
const DEFAULT_CONTACT_HOURS = 'Mon - Sat: 9:00 - 23:00<br />Sunday: 10:00 - 18:00';
const rawContactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS_HTML?.trim();
const rawContactHours = process.env.NEXT_PUBLIC_CONTACT_HOURS_HTML?.trim();
export const CONTACT_ADDRESS_HTML =
  rawContactAddress && rawContactAddress.length > 0 ? rawContactAddress : DEFAULT_CONTACT_ADDRESS;
export const CONTACT_HOURS_HTML =
  rawContactHours && rawContactHours.length > 0 ? rawContactHours : DEFAULT_CONTACT_HOURS;

const DEFAULT_PRIVACY_VERSION = '1.0.0';
const DEFAULT_PRIVACY_EFFECTIVE_DATE = '2025-06-24';
const rawPrivacyVersion = process.env.NEXT_PUBLIC_PRIVACY_VERSION?.trim();
const rawPrivacyEffectiveDate = process.env.NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE?.trim();
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
