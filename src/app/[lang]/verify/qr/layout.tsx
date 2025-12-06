import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { QrVerifyLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.authenticity.title}`;
  const pageDescription = t.authenticity.qrScanInstructions;
  const pageKeywords = [
    t.hero.title,
    t.authenticity.title,
    'Samyun Wan Armenia',
    'QR проверка Samyun Wan',
    'Samyun Wan ստուգում',
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.authenticity.title;

  return generatePageMetadata({
    lang,
    titleKey: 'authenticity.title',
    descriptionKey: 'authenticity.qrScanInstructions',
    keywords: pageKeywords,
    pagePath: 'verify/qr',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const QrVerifyLayout = ({ children }: QrVerifyLayoutProps) => {
  return <>{children}</>;
};

export default QrVerifyLayout;
