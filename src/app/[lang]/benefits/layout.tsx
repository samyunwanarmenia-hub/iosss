import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { benefitsItemsData } from '@/data/benefitsItems';
import { BenefitsLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: BenefitsLayoutProps): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const benefitTitles = benefitsItemsData.map(item => t.benefits[item.key].title);
  const benefitDescriptions = benefitsItemsData.map(item => t.benefits[item.key].desc).join('; ');

  const pageTitle = `${t.hero.title} - ${t.benefits.title}`;
  const pageDescription = `${t.benefits.subtitle} ${benefitDescriptions}`.trim();
  const keywordCandidates = [
    t.hero.title,
    t.benefits.title,
    t.benefits.subtitle,
    'Samyun Wan Armenia',
    ...benefitTitles,
    'Samyun Wan преимущества',
    'Samyun Wan արդյունքներ',
  ];
  const pageKeywords = Array.from(new Set(keywordCandidates.filter(Boolean)));
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.benefits.title;

  return generatePageMetadata({
    lang,
    titleKey: 'benefits.title',
    descriptionKey: 'benefits.subtitle',
    keywords: pageKeywords,
    pagePath: 'benefits',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const BenefitsLayout = ({ children }: BenefitsLayoutProps) => {
  return <>{children}</>;
};

export default BenefitsLayout;
