import { SITE_URL, PRIMARY_PHONE, SECONDARY_PHONE } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { resolveLang, type SupportedLang, LOCALE_CODES } from '@/config/locales';
import type { Testimonial } from '@/types/global';

const LOGO_URL = `${SITE_URL}/optimized/logo.png`;
export const SOCIAL_LINKS = [
  'https://instagram.com/samyunwanarmenia',
  'https://facebook.com/samyunwanarmenia',
  'https://t.me/samyunwanarmenia',
  'https://www.tiktok.com/@samyunwanarmenia',
  'https://www.youtube.com/@samyunwanarmenia',
  'https://wa.me/37495653666',
  'https://wa.me/37496653666',
  'https://m.me/samyunwanarmenia',
];

const toAbsoluteUrl = (value?: string) => {
  if (!value) {
    return SITE_URL;
  }

  return value.startsWith('http') ? value : `${SITE_URL}${value}`;
};

type OfferSchema = {
  '@type': 'Offer';
  url: string;
  priceCurrency: string;
  price: string;
  priceValidUntil: string;
  availability: string;
  itemCondition?: string;
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy';
    returnPolicyCategory: string;
  };
  shippingDetails: Array<{
    '@type': 'OfferShippingDetails';
    shippingDestination: {
      '@type': 'DefinedRegion';
      addressCountry: string;
    };
    shippingRate: {
      '@type': 'MonetaryAmount';
      value: string;
      currency: string;
    };
    deliveryTime?: {
      '@type': 'ShippingDeliveryTime';
      handlingTime?: {
        '@type': 'QuantitativeValue';
        minValue: number;
        maxValue: number;
        unitCode: string;
      };
      transitTime?: {
        '@type': 'QuantitativeValue';
        minValue: number;
        maxValue: number;
        unitCode: string;
      };
    };
  }>;
  seller: {
    '@type': 'Organization';
    name: string;
  };
};

export type ProductSchema = {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string;
  '@id'?: string;
  url?: string;
  sku?: string;
  mpn?: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: OfferSchema;
  inLanguage?: string;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  review?: Array<{
    '@type': 'Review';
    author: { '@type': 'Person'; name: string };
    reviewBody: string;
    reviewRating: { '@type': 'Rating'; ratingValue: string; bestRating: string; worstRating: string };
    inLanguage?: string;
  }>;
};

// Product Schema with Reviews and AggregateRating
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number | string;
  priceCurrency?: string;
  reviews?: Testimonial[];
  keywords?: string[];
  url?: string;
  productId?: string;
  sku?: string;
  mpn?: string;
  lang?: SupportedLang;
  priceValidUntil?: string;
  availability?: string;
  itemCondition?: string;
  mainEntityOfPage?: { '@type': 'WebPage'; '@id': string };
}): ProductSchema => {
  const priceValidUntil =
    product.priceValidUntil ??
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0];
  const langCode = product.lang ? LOCALE_CODES[resolveLang(product.lang)] : undefined;
  const reviewsWithRating = (product.reviews || []).filter(review => typeof review.rating === 'number');
  const aggregateRating =
    reviewsWithRating.length > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: (
            reviewsWithRating.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewsWithRating.length
          ).toFixed(2),
          reviewCount: reviewsWithRating.length.toString(),
          bestRating: '5',
          worstRating: '1',
        } as const
      : undefined;

  const review: NonNullable<ProductSchema['review']> = reviewsWithRating.map(reviewItem => {
    const reviewAuthor =
      product.lang === 'ru'
        ? reviewItem.nameRu
        : product.lang === 'en'
          ? reviewItem.nameEn
          : reviewItem.name;
    const reviewBody =
      product.lang === 'ru'
        ? reviewItem.textRu
        : product.lang === 'en'
          ? reviewItem.textEn
          : reviewItem.textHy;

    return {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: reviewAuthor || reviewItem.nameEn || reviewItem.name },
      reviewBody: reviewBody || '',
      reviewRating: {
        '@type': 'Rating' as const,
        ratingValue: (reviewItem.rating ?? 5).toString(),
        bestRating: '5',
        worstRating: '1',
      },
      ...(langCode ? { inLanguage: langCode } : {}),
    };
  });

  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': product.productId,
    url: product.url,
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Samyun Wan',
    },
    offers: {
      '@type': 'Offer',
      url: product.url ?? SITE_URL,
      priceCurrency: product.priceCurrency || 'AMD',
      price: product.price.toString(),
      priceValidUntil,
      availability: product.availability ?? 'https://schema.org/InStock',
      itemCondition: product.itemCondition ?? 'https://schema.org/NewCondition',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/NoReturn',
      },
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'AM',
          },
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: product.priceCurrency || 'AMD',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'd',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'd',
            },
          },
        },
      ],
      seller: {
        '@type': 'Organization',
        name: 'Samyun Wan Armenia',
      },
    },
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.mpn ? { mpn: product.mpn } : {}),
    ...(product.mainEntityOfPage ? { mainEntityOfPage: product.mainEntityOfPage } : {}),
    ...(langCode ? { inLanguage: langCode } : {}),
    ...(aggregateRating ? { aggregateRating } : {}),
    ...(review.length ? { review } : {}),
    ...(product.keywords?.length ? { keywords: product.keywords } : {}),
  };

  return schema;
};

// FAQPage Schema
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>,
  options?: { lang?: string; pageUrl?: string },
) => {
  const langCode = options?.lang ? LOCALE_CODES[resolveLang(options.lang)] : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    ...(langCode ? { inLanguage: langCode } : {}),
    ...(options?.pageUrl
      ? {
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': toAbsoluteUrl(options.pageUrl),
          },
        }
      : {}),
  };
};

export const generateFAQSchemaFromTranslations = (lang: string) => {
  const normalized: SupportedLang = resolveLang(lang);
  const t = translations[normalized] || translations.hy;
  const langCode = LOCALE_CODES[normalized];
  const pageUrl = `${SITE_URL}/${normalized}/faq`;
  const faqPairs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: langCode,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    mainEntity: faqPairs.map(pair => ({
      '@type': 'Question',
      name: pair.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: pair.a,
      },
    })),
  };
};

// BreadcrumbList Schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': crumb.url,
        name: crumb.name,
      },
    })),
  };
};

export const buildBreadcrumbItems = ({
  lang,
  segments,
}: {
  lang: string;
  segments: string[];
}): Array<{ name: string; url: string }> => {
  const normalized: SupportedLang = resolveLang(lang);
  const t = translations[normalized] || translations.hy;
  const navLabels = t.nav as Record<string, string>;

  const labelMap: Record<string, string> = {
    home: navLabels.home || t.hero.title,
    about: navLabels.about,
    benefits: navLabels.benefits,
    products: navLabels.products,
    testimonials: navLabels.testimonials,
    contact: navLabels.contact,
    faq: navLabels.faq,
    'track-order': navLabels.trackOrder ?? 'Track order',
    blogs: t.article?.title ?? 'Blogs',
    'how-to-identify-fake': t.authenticity?.title ?? 'Authenticity',
    privacy: navLabels.privacy ?? 'Privacy',
    terms: navLabels.terms ?? 'Terms',
    verify: t.authenticity?.qrScanInstructions ?? 'Verify',
  };

  const items = [
    { name: t.nav.home, url: `${SITE_URL}/${normalized}` },
    ...segments.map((segment, idx) => {
      const slug = segments.slice(0, idx + 1).join('/');
      return {
        name: labelMap[segment] || segment,
        url: `${SITE_URL}/${normalized}/${slug}`,
      };
    }),
  ];

  return items;
};

export const generateBreadcrumbs = ({
  lang,
  segments,
}: {
  lang: string;
  segments: string[];
}) => {
  const items = buildBreadcrumbItems({ lang, segments });
  return generateBreadcrumbSchema(items);
};

// LocalBusiness Schema
export const generateLocalBusinessSchema = (keywords?: string[]) => {
  const sameAs = Array.from(
    new Set([
      ...SOCIAL_LINKS,
      `https://wa.me/${PRIMARY_PHONE.replace(/\+/g, '')}`,
      `https://wa.me/${SECONDARY_PHONE.replace(/\+/g, '')}`,
    ]),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Samyun Wan Armenia',
    image: LOGO_URL,
    '@id': `${SITE_URL}#local-business`,
    url: SITE_URL,
    telephone: PRIMARY_PHONE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AM',
      addressLocality: 'Yerevan',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.1792,
      longitude: 44.4991,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
    sameAs,
    ...(keywords?.length ? { keywords } : {}),
  };
};

// WebPage Schema
export const generateWebPageSchema = (data: {
  url: string;
  name: string;
  description: string;
  lang: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: data.url,
    name: data.name,
    description: data.description,
    inLanguage: LOCALE_CODES[resolveLang(data.lang)],
    isPartOf: {
      '@type': 'WebSite',
      name: 'Samyun Wan Armenia',
      url: SITE_URL,
    },
  };
};

export const generateArticleSchema = (options: {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  publisherName: string;
  datePublished: string;
  dateModified?: string;
  inLanguage: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': toAbsoluteUrl(options.url),
  },
  headline: options.headline,
  description: options.description,
  image: toAbsoluteUrl(options.image),
  author: {
    '@type': 'Organization',
    name: options.authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: options.publisherName,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  datePublished: options.datePublished,
  dateModified: options.dateModified ?? options.datePublished,
  inLanguage: options.inLanguage,
});

export const generateBlogPostingSchema = (options: {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  publisherName: string;
  inLanguage: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': toAbsoluteUrl(options.url),
  },
  headline: options.headline,
  description: options.description,
  image: toAbsoluteUrl(options.image),
  author: {
    '@type': 'Person',
    name: options.authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: options.publisherName,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  datePublished: options.datePublished,
  dateModified: options.dateModified ?? options.datePublished,
  inLanguage: options.inLanguage,
  keywords: options.keywords,
});
