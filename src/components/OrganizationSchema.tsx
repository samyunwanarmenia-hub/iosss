import Script from 'next/script';

import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { SOCIAL_LINKS } from '@/utils/schemaUtils';
import { LOCALE_CODES } from '@/config/locales';

const OrganizationSchema = () => {
  const availableLanguages = Object.values(LOCALE_CODES);
  const address = {
    '@type': 'PostalAddress',
    streetAddress: '1 Teryan St',
    addressLocality: 'Yerevan',
    addressCountry: 'Armenia',
    postalCode: '0001',
  };

  const contactPoints = [
    {
      '@type': 'ContactPoint',
      telephone: PRIMARY_PHONE,
      contactType: 'customer support',
      availableLanguage: availableLanguages,
    },
  ];

  if (SECONDARY_PHONE) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: SECONDARY_PHONE,
      contactType: 'sales',
      availableLanguage: availableLanguages,
    });
  }

  const sameAs = SOCIAL_LINKS?.length ? SOCIAL_LINKS : undefined;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    '@id': `${SITE_URL}#organization`,
    url: SITE_URL,
    logo: `${SITE_URL}/optimized/logo.png`,
    address,
    ...(sameAs ? { sameAs } : {}),
    contactPoint: contactPoints,
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  );
};

export default OrganizationSchema;
