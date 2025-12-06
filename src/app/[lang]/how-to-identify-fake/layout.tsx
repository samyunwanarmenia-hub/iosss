import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const pageTitle = `${t.authenticity.howToDistinguish} | Samyun Wan Armenia`;
  const pageDescription = `${t.authenticity.fakeWarningText} ${t.authenticity.verificationTitle}`;

  return generatePageMetadata({
    lang,
    titleKey: 'authenticity.howToDistinguish',
    descriptionKey: 'authenticity.fakeWarningText',
    keywords: [
      'Samyun Wan оригинал',
      'как отличить подделку',
      'QR-код проверка',
      'օրիգինալ ապրանք Samyun Wan',
    ],
    pagePath: 'how-to-identify-fake',
    image: `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`,
    imageAlt: pageTitle,
    type: 'article',
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const HowToIdentifyFakeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HowToIdentifyFakeLayout;
