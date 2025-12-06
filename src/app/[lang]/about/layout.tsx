import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { AboutLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata'; // Import the new utility
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.nav.about}`;
  const pageDescription = t.about.description;
  const keywordCandidates = [
    t.hero.title,
    t.nav.about,
    t.about.subtitle,
    'Samyun Wan',
    'Armenia',
    'official representative',
    'natural ingredients',
    'proven effectiveness',
    'safe to use',
    'fast results',
  ];
  const pageKeywords = Array.from(new Set(keywordCandidates.filter(Boolean)));
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`; // Generic image for about page
  const pageImageAlt = t.nav.about;

  return generatePageMetadata({
    lang,
    titleKey: 'nav.about',
    descriptionKey: 'about.description',
    keywords: pageKeywords,
    pagePath: 'about',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return <>{children}</>;
};

export default AboutLayout;
