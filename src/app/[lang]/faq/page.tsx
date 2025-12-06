import FaqSection from '@/components/FaqSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { generateFAQSchemaFromTranslations, buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/faq');
  return {
    ...buildPageMetadata(params.lang, 'faq', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const FaqPage = ({ params }: { params: { lang: string } }) => {
  const currentLang: SupportedLang = resolveLang(params.lang);

  const breadcrumbItems = buildBreadcrumbItems({ lang: currentLang, segments: ['faq'] });
  const faqSchema = generateFAQSchemaFromTranslations(currentLang);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ScriptLD json={faqSchema} />
      <FaqSection />
    </>
  );
};

export default FaqPage;
