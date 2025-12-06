import { TranslationKeys, FaqQuestionKey, FaqAnswerKey, ProductShowcaseItem, Testimonial } from '@/types/global';
import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { SOCIAL_LINKS } from '@/utils/schemaUtils';
import { baseTestimonials } from '@/data/testimonials';
import { LOCALE_CODES, resolveLang } from '@/config/locales';

const LOGO_URL = `${SITE_URL}/optimized/logo.png`;

const calculateAggregateRating = (testimonials: Testimonial[]) => {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  const total = testimonials.reduce((sum, item) => sum + (item.rating || 0), 0);
  const ratingValue = (total / testimonials.length).toFixed(2);

  return {
    ratingValue,
    reviewCount: testimonials.length.toString(),
    bestRating: '5',
    worstRating: '1',
  };
};

const AGGREGATE_RATING = calculateAggregateRating(baseTestimonials);

export const generateOrganizationStructuredData = (t: TranslationKeys, currentLang: string) => {
  const langCode = LOCALE_CODES[resolveLang(currentLang)];
  const availableLanguages = Object.values(LOCALE_CODES);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Samyun Wan Armenia',
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_LINKS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PRIMARY_PHONE,
        contactType: 'customer support',
        areaServed: 'AM',
        availableLanguage: availableLanguages,
      },
      {
        '@type': 'ContactPoint',
        telephone: SECONDARY_PHONE,
        contactType: 'sales',
        areaServed: 'AM',
        availableLanguage: availableLanguages,
      },
    ],
    inLanguage: langCode,
  };
};

export const generateFaqStructuredData = (t: TranslationKeys, currentLang: string) => {
  const langCode = LOCALE_CODES[resolveLang(currentLang)];

  const questions: { key: FaqQuestionKey; answerKey: FaqAnswerKey }[] = [
    { key: 'q1', answerKey: 'a1' },
    { key: 'q2', answerKey: 'a2' },
    { key: 'q3', answerKey: 'a3' },
    { key: 'q4', answerKey: 'a4' },
  ];

  const mainEntity = questions.map(q => ({
    "@type": "Question",
    "name": t.faq[q.key as FaqQuestionKey], // Explicit type assertion
    "acceptedAnswer": {
      "@type": "Answer",
      "text": t.faq[q.answerKey as FaqAnswerKey] // Explicit type assertion
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity,
    inLanguage: langCode,
  };
};

export const generateProductStructuredData = (
  t: TranslationKeys,
  product: ProductShowcaseItem,
  currentLang: string,
  baseUrl: string
) => {
  const langCode = LOCALE_CODES[resolveLang(currentLang)];
  const productName = t.productShowcase[product.labelKey as keyof TranslationKeys['productShowcase']]; // Explicit type assertion
  const productDescription = t.productShowcase[product.descKey as keyof TranslationKeys['productShowcase']]; // Explicit type assertion
  const productUrl = `${baseUrl}/${currentLang}/products`; // Link to the products page
  const imageUrl = `${baseUrl}${product.src}`; // Full URL for the image
  const aggregateRating = AGGREGATE_RATING
    ? {
        '@type': 'AggregateRating',
        ...AGGREGATE_RATING,
      }
    : undefined;

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productName,
    image: imageUrl,
    description: productDescription,
    inLanguage: langCode,
    sku: `SW-${product.labelKey.toUpperCase()}-${currentLang.toUpperCase()}`, // Unique SKU
    brand: {
      '@type': 'Brand',
      name: t.hero.title, // Samyun Wan Armenia
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'AMD',
      price: product.price.toString(),
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: t.hero.title,
      },
    },
    ...(aggregateRating ? { aggregateRating } : {}),
  };
};

export const generateWebSiteStructuredData = (baseUrl: string, t: TranslationKeys) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: t.hero.title,
    description: t.hero.subtitle,
  };
};

export const generateReviewStructuredData = (
  t: TranslationKeys,
  testimonial: Testimonial,
  currentLang: string
) => {
  const langCode = LOCALE_CODES[resolveLang(currentLang)];
  const authorName = currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn;
  const reviewBody = currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : testimonial.textEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    inLanguage: langCode,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: reviewBody,
    itemReviewed: {
      '@type': 'Brand',
      name: t.hero.title,
    },
  };
};
