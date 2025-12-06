import { LEGAL_COPY, buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import LegalPageLayout from '@/components/LegalPageLayout';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { PRIVACY_EFFECTIVE_DATE, PRIVACY_POLICY_VERSION } from '@/config/siteConfig';
import { buildAlternates } from '@/utils/alternateLinks';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/privacy');
  return {
    ...buildPageMetadata(params.lang, 'privacy', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Վերջնական իրավական տեքստը շուտով կավելացնենք այս բաժնում։',
  ru: 'Окончательный юридический текст появится в этом разделе совсем скоро.',
  en: 'Full legal text will be published here soon.',
};

const META_LABELS: Record<SupportedLang, { version: string; effectiveDate: string }> = {
  hy: { version: 'Տարբերակ', effectiveDate: 'Ուժի մեջ է մտնում' },
  ru: { version: 'Версия', effectiveDate: 'Дата вступления в силу' },
  en: { version: 'Version', effectiveDate: 'Effective date' },
};

const PrivacyPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;
  const { version, effectiveDate } = META_LABELS[lang] ?? META_LABELS.hy;

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['privacy'] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegalPageLayout
        title={copy.privacyTitle}
        description={copy.privacyDescription}
        notice={notice}
        type="privacy"
        versionLabel={version}
        versionValue={PRIVACY_POLICY_VERSION}
        effectiveDateLabel={effectiveDate}
        effectiveDateValue={PRIVACY_EFFECTIVE_DATE}
      />
    </>
  );
};

export default PrivacyPage;
