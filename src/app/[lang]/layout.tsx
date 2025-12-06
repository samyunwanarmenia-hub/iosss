import { ReactNode } from 'react';
import { Metadata } from 'next';

import { translations } from '@/i18n/translations';
import HtmlLangSetter from '@/components/HtmlLangSetter';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang, SUPPORTED_LANGS } from '@/config/locales';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const lang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  return generatePageMetadata({
    lang,
    titleKey: 'hero.title',
    descriptionKey: 'hero.tagline',
    keywords: [
      t.hero.subtitle,
      t.hero.tagline,
      t.authenticity.title,
      t.contact.title,
    ],
    pagePath: '',
    image: `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(t.hero.title)}`,
    imageAlt: `${t.hero.title} - ${t.hero.subtitle}`,
    titleOverride: `${t.hero.title} - ${t.hero.subtitle}`,
    descriptionOverride: `${t.hero.tagline} ${t.about.description} ${t.benefits.subtitle}`.trim(),
  });
}

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }));
}

const LangLayout = ({ children, params }: LangLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);

  return (
    <>
      <HtmlLangSetter lang={lang} />
      {children}
    </>
  );
};

export default LangLayout;
