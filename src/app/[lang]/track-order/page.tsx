import TrackOrderSection from '@/components/TrackOrderSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/track-order');
  return {
    ...buildPageMetadata(params.lang, 'track-order', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const TrackOrderPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['track-order'] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TrackOrderSection />
    </>
  );
};

export default TrackOrderPage;
