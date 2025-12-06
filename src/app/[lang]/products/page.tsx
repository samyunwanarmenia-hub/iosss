import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { productShowcaseData } from '@/data/productShowcaseData';
import { translations } from '@/i18n/translations';
import { SITE_URL } from '@/config/siteConfig';
import { generateProductSchema, buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang, LOCALE_CODES } from '@/config/locales';
import { baseTestimonials } from '@/data/testimonials';
import { getSeoKeywords } from '@/config/seoKeywords';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/products');
  return {
    ...buildPageMetadata(params.lang, 'products', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

export const revalidate = 60 * 60 * 12;

const ProductsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const langCode = LOCALE_CODES[lang];

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['products'] });

  const priceValidUntil = (() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date.toISOString().split('T')[0];
  })();

  const productsPageUrl = `${SITE_URL}/${lang}/products`;
  const seoKeywords = getSeoKeywords(lang);

  const localizedProducts = productShowcaseData.map(product => ({
    ...product,
    name: t.productShowcase[product.labelKey],
    description: t.productShowcase[product.descKey],
  }));

  const productSchemas = localizedProducts.map(product => {
    const image = `${SITE_URL}${product.src}`;
    const productId = `${productsPageUrl}#${product.labelKey}`;

    return generateProductSchema({
      name: product.name,
      description: product.description,
      image,
      price: product.price,
      priceCurrency: 'AMD',
      reviews: baseTestimonials,
      keywords: seoKeywords,
      url: productsPageUrl,
      productId,
      sku: `SW-${product.labelKey.toUpperCase()}-${lang.toUpperCase()}`,
      mpn: `MPN-${product.labelKey.toUpperCase()}`,
      lang,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': productsPageUrl,
      },
    });
  });

  const productCollectionSchema = {
    '@type': 'ProductCollection',
    '@id': `${productsPageUrl}#collection`,
    name: t.productShowcase.seoHeading ?? t.hero.title,
    description: t.productShowcase.seoParagraph ?? t.hero.subtitle,
    url: productsPageUrl,
    inLanguage: langCode,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': productsPageUrl,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.productShowcase.seoHeading ?? t.nav.products,
      itemListElement: productSchemas.map((productSchema, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': productSchema['@id'],
        },
      })),
    },
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [...productSchemas, productCollectionSchema],
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ScriptLD json={graphSchema} />
      <ProductShowcaseSection />
    </>
  );
};

export default ProductsPage;
