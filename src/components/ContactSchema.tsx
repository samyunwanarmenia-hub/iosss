import Script from 'next/script';
import { LOCALE_CODES, type SupportedLang } from '@/config/locales';
import { baseTestimonials } from '@/data/testimonials';

type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
  postalCode?: string;
};

type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

type OpeningHoursSpecification = {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

type ContactSchemaProps = {
  name: string;
  url: string;
  telephone: string;
  secondaryTelephone?: string;
  address: Address;
  openingHoursSpecification?: OpeningHoursSpecification[];
  sameAs?: string[];
  priceRange?: string;
  geo?: GeoCoordinates;
  lang: SupportedLang;
};

const ContactSchema = ({
  name,
  url,
  telephone,
  secondaryTelephone,
  address,
  openingHoursSpecification,
  sameAs,
  priceRange,
  geo,
  lang,
}: ContactSchemaProps) => {
  const availableLanguages = Object.values(LOCALE_CODES);
  const contactPoints = [
    {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer support',
      availableLanguage: availableLanguages,
    },
  ];

  if (secondaryTelephone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: secondaryTelephone,
      contactType: 'sales',
      availableLanguage: availableLanguages,
    });
  }

  const langCode = LOCALE_CODES[lang];
  const reviews = baseTestimonials.map(testimonial => {
    const author =
      lang === 'ru'
        ? testimonial.nameRu
        : lang === 'en'
          ? testimonial.nameEn
          : testimonial.name;
    const reviewBody =
      lang === 'ru'
        ? testimonial.textRu
        : lang === 'en'
          ? testimonial.textEn
          : testimonial.textHy;

    return {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: author || testimonial.nameEn || testimonial.name,
      },
      reviewBody: reviewBody || '',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: (testimonial.rating ?? 5).toString(),
        bestRating: '5',
        worstRating: '1',
      },
      inLanguage: langCode,
    };
  });

  const aggregateRating =
    reviews.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (
            baseTestimonials.reduce((sum, review) => sum + (review.rating || 0), 0) / baseTestimonials.length
          ).toFixed(2),
          reviewCount: reviews.length.toString(),
          bestRating: '5',
          worstRating: '1',
        }
      : undefined;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    telephone,
    inLanguage: langCode,
    priceRange: priceRange ?? 'AMD 14000-15000',
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    contactPoint: contactPoints,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo?.latitude ?? 40.1872,
      longitude: geo?.longitude ?? 44.5152,
    },
    ...(openingHoursSpecification?.length ? { openingHoursSpecification } : {}),
    ...(sameAs?.length ? { sameAs } : {}),
    ...(aggregateRating ? { aggregateRating } : {}),
    ...(reviews.length ? { review: reviews } : {}),
  };

  return (
    <Script id="contact-schema" type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  );
};

export default ContactSchema;
