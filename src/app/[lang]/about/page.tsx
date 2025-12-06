import AboutSection from '@/components/AboutSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { buildAlternates } from '@/utils/alternateLinks';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/about');
  return {
    ...buildPageMetadata(params.lang, 'about', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const AboutPage = ({ params }: { params: { lang: string } }) => {
  const _lang: SupportedLang = resolveLang(params.lang);
  const breadcrumbItems = buildBreadcrumbItems({ lang: _lang, segments: ['about'] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <AboutSection />
    </>
  );
};

export default AboutPage;
