import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { ProductsLayoutProps } from '@/types/global';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.nav.products} - ${t.hero.title}`;
  const pageDescription = `${t.productShowcase.weightGainDesc} | ${t.productShowcase.weightLossDesc} | ${t.hero.tagline} ${t.authenticity.howToDistinguish}`.trim();

  return generatePageMetadata({
    lang,
    titleKey: 'nav.products',
    descriptionKey: 'productShowcase.weightGainDesc',
    keywords: [
      t.productShowcase.weightGainLabel,
      t.productShowcase.weightLossLabel,
      t.authenticity.howToDistinguish,
    ],
    pagePath: 'products',
    image: `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`,
    imageAlt: t.productShowcase.weightGainLabel,
    type: 'website',
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const ProductsLayout = ({ children, params }: ProductsLayoutProps) => {
  const _lang: SupportedLang = resolveLang(params.lang);

  return (
    <>{children}</>
  );
};

export default ProductsLayout;
