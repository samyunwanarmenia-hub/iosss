import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { TrackOrderLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.nav.trackOrder}`;
  const pageDescription = t.trackOrder.subtitle;
  const pageKeywords = [
    t.hero.title,
    t.nav.trackOrder,
    'Samyun Wan Armenia',
    'отследить заказ Samyun Wan',
    'Samyun Wan պատվերի ստուգում',
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.nav.trackOrder;

  return generatePageMetadata({
    lang,
    titleKey: 'nav.trackOrder',
    descriptionKey: 'trackOrder.subtitle',
    keywords: pageKeywords,
    pagePath: 'track-order',
    image: pageImage,
    imageAlt: pageImageAlt,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const TrackOrderLayout = ({ children }: TrackOrderLayoutProps) => {
  return <>{children}</>;
};

export default TrackOrderLayout;
