import dynamic from 'next/dynamic';

import { buildPageMetadata } from '@/utils/pageMetadata';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/testimonials');
  return {
    ...buildPageMetadata(params.lang, 'testimonials', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const TestimonialsPageClient = dynamic(() => import('./Client'), { ssr: false });

const TestimonialsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['testimonials'] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TestimonialsPageClient />
    </>
  );
};

export default TestimonialsPage;
