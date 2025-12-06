import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { contactInfoData } from '@/data/contactInfo';
import { ContactLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import type { TranslationKeys } from '@/types/global';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const contactDetails = contactInfoData
    .map(item => (item.key === 'phone' ? t.contact.phoneNumbers.description : item.details))
    .join('; ');

  const pageTitle = `${t.hero.title} - ${t.nav.contact}`;
  const pageDescription = `${t.contact.title}. ${contactDetails}`.trim();
  const pageKeywords = [
    t.hero.title,
    t.nav.contact,
    'Samyun Wan Armenia',
    'контакты Samyun Wan',
    'Samyun Wan կապ',
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.nav.contact;

  return generatePageMetadata({
    lang,
    titleKey: 'nav.contact',
    descriptionKey: 'contact.title',
    keywords: pageKeywords,
    pagePath: 'contact',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const normalizeText = (value: string) => value.replace(/<br\s*\/?>/gi, ', ').replace(/<[^>]+>/g, '').trim();

const buildContactSchema = (lang: SupportedLang, t: TranslationKeys) => {
  const phoneNumbers = [
    t.contact.phoneNumbers?.number1,
    t.contact.phoneNumbers?.number2,
  ].filter(Boolean);

  const addressItem = contactInfoData.find(item => item.key === 'address');
  const hoursSpecification = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '18:00',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Samyun Wan Armenia',
    url: `${SITE_URL}/${lang}/contact`,
    image: `${SITE_URL}/optimized/og-image-1200x630.webp`,
    telephone: phoneNumbers,
    address: {
      '@type': 'PostalAddress',
      streetAddress: normalizeText(addressItem?.details ?? '1 Teryan St'),
      addressLocality: 'Yerevan',
      addressCountry: 'AM',
    },
    contactPoint: phoneNumbers.map(phone => ({
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'customer support',
      availableLanguage: ['hy-AM', 'ru-RU', 'en-US'],
    })),
    openingHoursSpecification: hoursSpecification,
  };
};

const ContactLayout = ({ children, params }: ContactLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const contactSchema = buildContactSchema(lang, t);

  return (
    <>
      <ScriptLD json={contactSchema} />
      {children}
    </>
  );
};

export default ContactLayout;
