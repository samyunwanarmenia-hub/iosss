import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { FaqLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.nav.faq}`;
  const pageDescription = t.faq.q1;
  const pageKeywords = [
    t.hero.title,
    t.nav.faq,
    'Samyun Wan Armenia FAQ',
    'Samyun Wan հարցեր',
    'Samyun Wan вопросы',
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.nav.faq;

  return generatePageMetadata({
    lang,
    titleKey: 'nav.faq',
    descriptionKey: 'faq.q1',
    keywords: pageKeywords,
    pagePath: 'faq',
    image: pageImage,
    imageAlt: pageImageAlt,
    type: 'website',
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const FaqLayout = ({ children }: FaqLayoutProps) => {
  return <>{children}</>;
};

export default FaqLayout;
