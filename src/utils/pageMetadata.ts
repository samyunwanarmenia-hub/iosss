import type { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import type { TranslationKeys } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang as normalizeLang, type SupportedLang } from '@/config/locales';
import { getSeoKeywords } from '@/config/seoKeywords';

export type SitePageKey =
  | 'home'
  | 'about'
  | 'benefits'
  | 'products'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'track-order'
  | 'how-to-identify-fake'
  | 'blogs'
  | 'verify/qr'
  | 'privacy'
  | 'terms';

type ChangeFrequency = 'daily' | 'weekly' | 'monthly';

interface SitePageDefinition {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  buildCopy: (t: TranslationKeys, lang: SupportedLang) => {
    title: string;
    description: string;
    keywords: string[];
    imageAlt?: string;
  };
}

const buildKeywords = (...values: Array<string | undefined>) => values.filter(Boolean) as string[];

const resolveTranslationKey = (obj: unknown, key: string | undefined) => {
  if (!key) return undefined;
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

const truncateDescription = (text: string, limit = 160) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

type GenerateMetadataOptions = {
  lang: string;
  titleKey: string;
  descriptionKey: string;
  keywords?: string[];
  pagePath?: string;
  image?: string;
  imageAlt?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  titleOverride?: string;
  descriptionOverride?: string;
};

export const generateMetadata = ({
  lang,
  titleKey,
  descriptionKey,
  keywords = [],
  pagePath = '',
  image,
  imageAlt,
  canonicalPath,
  type = 'website',
  titleOverride,
  descriptionOverride,
}: GenerateMetadataOptions): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;

  const translatedTitle = titleOverride ?? (resolveTranslationKey(t, titleKey) as string) ?? titleKey;
  const translatedDescription =
    descriptionOverride ?? (resolveTranslationKey(t, descriptionKey) as string) ?? descriptionKey;

  const finalDescription = truncateDescription(translatedDescription);
  const keywordList = Array.from(new Set([...(keywords || []), ...getSeoKeywords(normalizedLang)]));
  const ogImage = image ?? `${SITE_URL}/api/og/${normalizedLang}?title=${encodeURIComponent(translatedTitle)}`;

  return generateCommonMetadata({
    lang: normalizedLang,
    t,
    pagePath,
    title: `${translatedTitle} | Samyun Wan Armenia`,
    description: finalDescription,
    keywords: keywordList.join(', '),
    image: ogImage,
    imageAlt: imageAlt ?? translatedTitle,
    type,
    canonicalPath,
  });
};

export const LEGAL_COPY: Record<
  SupportedLang,
  { privacyTitle: string; privacyDescription: string; termsTitle: string; termsDescription: string }
> = {
  hy: {
    privacyTitle: 'Գաղտնիության քաղաքականություն',
    privacyDescription:
      'Samyun Wan Armenia-ն հավաքում և օգտագործում է միայն այն տվյալները, որոնք անհրաժեշտ են պատվերի մշակման, վճարման, առաքման և հաճախորդի աջակցության համար։ Տվյալները չեն փոխանցվում երրորդ կողմերին՝ բացառությամբ օրենքով պահանջված դեպքերի։',
    termsTitle: 'Օգտագործման պայմաններ և պատասխանատվության սահմանափակում',
    termsDescription:
      'Պատվերների, վճարման և վերադարձի հիմնական պայմաններ Samyun Wan Armenia-ի համար, տվյալների օգտագործում և բժշկական հայտարարագիր. կայքի տեղեկանքը տեղեկացնող է, մինչև ընդունելը խորհրդակցեք բժշկի հետ, հակացուցված է հղիության/կրծքով կերակրման դեպքում, մինչև 18 տարեկանում կամ քրոնիկ հիվանդությունների դեպքում առանց բժշկի հաստատման։',
  },
  ru: {
    privacyTitle: 'Политика конфиденциальности',
    privacyDescription:
      'Samyun Wan Armenia собирает и использует только данные, необходимые для оформления заказа, оплаты, доставки и поддержки клиента. Данные не передаются третьим лицам, кроме как по закону или для выполнения доставки.',
    termsTitle: 'Пользовательское соглашение и отказ от ответственности',
    termsDescription:
      'Условия заказа и оплаты: заявки через сайт/мессенджеры, предоплата по согласованию, возврат возможен при целостности упаковки и сохранности товара. Обработка персональных данных — только для оплаты, доставки и поддержки. Медицинский отказ: информация на сайте не является рекомендацией, перед приемом консультируйтесь с врачом; противопоказано при беременности/ГВ, до 18 лет и при хронических заболеваниях без разрешения врача.',
  },
  en: {
    privacyTitle: 'Privacy Policy',
    privacyDescription:
      'Samyun Wan Armenia collects and uses only the data needed to process orders, take payments, deliver products, and support customers. Data is not shared with third parties except when required by law or to fulfill delivery.',
    termsTitle: 'User Agreement & Medical Disclaimer',
    termsDescription:
      'Ordering and payment terms, personal data use for payments/shipping/support, and medical disclaimer: site info is not medical advice; consult your doctor; not for pregnancy/breastfeeding, under 18, or chronic conditions without physician approval.',
  },
};

export const SITE_PAGE_CONFIG: Record<SitePageKey, SitePageDefinition> = {
  home: {
    path: '',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => ({
      title: `${t.hero.title} – ${t.hero.subtitle}`,
      description: `${t.hero.tagline} ${t.about.description}`,
      keywords: buildKeywords(
        t.hero.title,
        t.hero.subtitle,
        // Long-tail keywords for better SEO
        lang === 'ru' 
          ? 'как набрать вес безопасно в Армении 2025'
          : lang === 'en'
          ? 'how to gain weight safely in Armenia 2025'
          : 'ինչպես անվտանգ քաշ ավելացնել Հայաստանում 2025',
        lang === 'ru'
          ? 'оригинальный Samyun Wan с QR проверкой Ереван'
          : lang === 'en'
          ? 'original Samyun Wan with QR verification Yerevan'
          : 'օրիգինալ Samyun Wan QR ստուգմամբ Երևան',
        lang === 'ru'
          ? 'где купить настоящий Samyun Wan Armenia доставка'
          : lang === 'en'
          ? 'where to buy authentic Samyun Wan Armenia delivery'
          : 'որտեղ գնել իրական Samyun Wan Armenia առաքում',
        t.nav.products,
        t.benefits.title,
        t.contact.title
      ),
      imageAlt: `${t.hero.title} - оригинальный продукт для набора веса с QR верификацией`,
    }),
  },
  about: {
    path: 'about',
    priority: 0.8,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.about.title,
      description: `${t.about.subtitle}. ${t.about.description}`,
      keywords: buildKeywords(
        t.about.title,
        t.about.subtitle,
        t.about.natural.title,
        t.about.proven.title,
        t.about.safe.title,
      ),
      imageAlt: t.about.title,
    }),
  },
  benefits: {
    path: 'benefits',
    priority: 0.8,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.benefits.title,
      description: `${t.benefits.subtitle} ${t.benefits.appetite.desc} ${t.benefits.weight.desc}`,
      keywords: buildKeywords(
        t.benefits.title,
        t.benefits.subtitle,
        t.benefits.energy.title,
        t.benefits.immunity.title,
        t.benefits.metabolism.title,
      ),
      imageAlt: t.benefits.title,
    }),
  },
  products: {
    path: 'products',
    priority: 0.8,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => ({
      title: t.nav.products,
      description: `${t.productShowcase.weightGainDesc} / ${t.productShowcase.weightLossDesc}. ${t.orderModal.title}`,
      keywords: buildKeywords(
        t.nav.products,
        // Long-tail keywords
        lang === 'ru'
          ? 'купить Samyun Wan Armenia для набора веса с доставкой Ереван'
          : lang === 'en'
          ? 'buy Samyun Wan Armenia for weight gain delivery Yerevan'
          : 'գնել Samyun Wan Armenia քաշի ավելացման առաքում Երևան',
        lang === 'ru'
          ? 'цена оригинального Samyun Wan Armenia 2025 официальный представитель'
          : lang === 'en'
          ? 'price original Samyun Wan Armenia 2025 official representative'
          : 'գին օրիգինալ Samyun Wan Armenia 2025 պաշտոնական ներկայացուցիչ',
        t.productShowcase.orderWeightGain,
        t.productShowcase.orderWeightLoss,
        t.hero.guarantee,
      ),
      imageAlt: `${t.nav.products} - оригинальные витамины для набора и снижения веса с сертификатом`,
    }),
  },
  testimonials: {
    path: 'testimonials',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.testimonials.title,
      description: `${t.testimonials.formSubtitle} ${t.testimonials.thankYou}`,
      keywords: buildKeywords(
        t.testimonials.title,
        t.testimonials.formTitle,
        t.testimonials.newReviewLabel,
        t.testimonials.submitButton,
      ),
      imageAlt: t.testimonials.title,
    }),
  },
  faq: {
    path: 'faq',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.nav.faq,
      description: `${t.faq.q1} ${t.faq.a1}`,
      keywords: buildKeywords(t.nav.faq, t.faq.q1, t.faq.q2, t.faq.q3),
      imageAlt: t.nav.faq,
    }),
  },
  contact: {
    path: 'contact',
    priority: 0.7,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.contact.title,
      description: `${t.contact.phoneNumbers.description}. ${t.contact.whatsappButton} / ${t.contact.callNowButton}`,
      keywords: buildKeywords(
        t.contact.title,
        t.contact.phone,
        t.contact.whatsappButton,
        t.contact.callNowButton,
        t.contact.address,
      ),
      imageAlt: t.contact.title,
    }),
  },
  'track-order': {
    path: 'track-order',
    priority: 0.7,
    changeFrequency: 'weekly',
    buildCopy: t => ({
      title: t.trackOrder.title,
      description: `${t.trackOrder.subtitle} ${t.trackOrder.processingRequest}`,
      keywords: buildKeywords(
        t.trackOrder.title,
        t.trackOrder.orderIdPlaceholder,
        t.trackOrder.trackButton,
        t.trackOrder.statusNotFound,
      ),
      imageAlt: t.trackOrder.title,
    }),
  },
  'how-to-identify-fake': {
    path: 'how-to-identify-fake',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => ({
      title: t.authenticity.howToDistinguish,
      description: `${t.authenticity.differencesDesc} ${t.authenticity.certificateDesc}`,
      keywords: buildKeywords(
        t.authenticity.howToDistinguish,
        t.authenticity.title,
        // Long-tail keywords
        lang === 'ru'
          ? 'как отличить поддельный Samyun Wan от оригинала 2025'
          : lang === 'en'
          ? 'how to distinguish fake Samyun Wan from original 2025'
          : 'ինչպես տարբերել կեղծ Samyun Wan-ը օրիգինալից 2025',
        lang === 'ru'
          ? 'признаки подделки Samyun Wan Armenia проверка QR кода'
          : lang === 'en'
          ? 'signs of fake Samyun Wan Armenia QR code verification'
          : 'կեղծ Samyun Wan Armenia նշաններ QR կոդի ստուգում',
        t.authenticity.attention,
        t.authenticity.qrScanInstructions,
      ),
      imageAlt: `${t.authenticity.title} - сравнение оригинального и поддельного продукта с QR кодом`,
    }),
  },
  blogs: {
    path: 'blogs',
    priority: 0.9,
    changeFrequency: 'weekly',
    buildCopy: (t, lang) => {
      const article = t.article;
      const extraKeywords = article.metaKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(Boolean);

      return {
        title: article.metaTitle,
        description: article.metaDescription,
        keywords: buildKeywords(
          article.title,
          article.subtitle,
          ...extraKeywords,
          lang === 'ru' ? 'блог Samyun Wan' : lang === 'en' ? 'Samyun Wan blog guide' : 'Samyun Wan բլոգ',
          article.ctaLabel
        ),
        imageAlt: article.title,
      };
    },
  },
  'verify/qr': {
    path: 'verify/qr',
    priority: 0.7,
    changeFrequency: 'monthly',
    buildCopy: t => ({
      title: t.authenticity.qrScanInstructions,
      description: `${t.authenticity.qrScanInstructions} ${t.authenticity.waitingForLink}`,
      keywords: buildKeywords(
        t.authenticity.title,
        t.authenticity.qrScanInstructions,
        t.authenticity.qrScanSuccess,
        t.authenticity.recordingInstructions,
      ),
      imageAlt: t.authenticity.qrScanInstructions,
    }),
  },
  privacy: {
    path: 'privacy',
    priority: 0.4,
    changeFrequency: 'monthly',
    buildCopy: (_t, lang) => {
      const copy = LEGAL_COPY[lang];
      return {
        title: copy.privacyTitle,
        description: copy.privacyDescription,
        keywords: buildKeywords(copy.privacyTitle, copy.privacyDescription),
        imageAlt: copy.privacyTitle,
      };
    },
  },
  terms: {
    path: 'terms',
    priority: 0.4,
    changeFrequency: 'monthly',
    buildCopy: (_t, lang) => {
      const copy = LEGAL_COPY[lang];
      return {
        title: copy.termsTitle,
        description: copy.termsDescription,
        keywords: buildKeywords(copy.termsTitle, copy.termsDescription),
        imageAlt: copy.termsTitle,
      };
    },
  },
};

interface BuildPageMetadataOptions {
  canonicalPath?: string;
  type?: 'website' | 'article';
}

export const buildPageMetadata = (
  lang: string,
  key: SitePageKey,
  options?: BuildPageMetadataOptions
): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;
  const config = SITE_PAGE_CONFIG[key];

  if (!config) {
    throw new Error(`Unknown site page metadata key: ${key}`);
  }

  const { title, description, keywords, imageAlt } = config.buildCopy(t, normalizedLang);
  const keywordList = keywords.length ? keywords : [title, t.hero.title];
  const extendedKeywords = Array.from(new Set([...keywordList, ...getSeoKeywords(normalizedLang)]));
  const canonicalPath =
    options?.canonicalPath ?? `/hy${config.path ? `/${config.path.replace(/^\/+|\/+$/g, '')}` : ''}`;

  return generateMetadata({
    lang: normalizedLang,
    titleKey: 'hero.title',
    descriptionKey: 'hero.tagline',
    pagePath: config.path,
    keywords: extendedKeywords,
    image: `${SITE_URL}/api/og/${normalizedLang}?title=${encodeURIComponent(title)}`,
    imageAlt: imageAlt ?? title,
    canonicalPath,
    type: options?.type,
    titleOverride: title,
    descriptionOverride: description,
  });
};
