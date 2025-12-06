import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { translations } from '@/i18n/translations';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';

// Lazy load sections to reduce initial bundle size
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: true, // Keep SSR for SEO
});

const ProductShowcaseSection = dynamic(() => import('@/components/ProductShowcaseSection'), {
  ssr: true, // Keep SSR for SEO
});

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates();
  return {
    ...buildPageMetadata(params.lang, 'home', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const LangPage = async ({ params }: { params: { lang: string } }) => {
  const currentLang: SupportedLang = resolveLang(params.lang);
  const { statsData } = await import('@/data/stats');
  const t = translations[currentLang] || translations.hy;
  const heroFallbackLabel = `Loading ${t.hero.title}`;
  const productsFallbackLabel = `Loading ${t.nav.products}`;
  const breadcrumbItems = buildBreadcrumbItems({ lang: currentLang, segments: [] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Suspense
        fallback={
          <section
            className="min-h-[320px] rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse"
            aria-label={heroFallbackLabel}
          />
        }
      >
        <HeroSection stats={statsData} />
      </Suspense>
      <Suspense
        fallback={
          <section
            className="min-h-[420px] mt-6 rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse"
            aria-label={productsFallbackLabel}
          />
        }
      >
        <ProductShowcaseSection />
      </Suspense>
    </>
  );
};

export default LangPage;
