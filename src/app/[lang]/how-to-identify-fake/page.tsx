import { Suspense } from 'react';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { QR_VERIFICATION_URL, QR_VERIFICATION_REL } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import type { TranslationKeys } from '@/types/global';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/how-to-identify-fake');
  return {
    ...buildPageMetadata(params.lang, 'how-to-identify-fake', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

export const revalidate = 60 * 60 * 12;

const HowToIdentifyFakePage = ({ params }: { params: { lang: string } }) => {
  const currentLang: SupportedLang = resolveLang(params.lang);
  const t: TranslationKeys = translations[currentLang] || translations.hy;

  const breadcrumbItems = buildBreadcrumbItems({ lang: currentLang, segments: ['how-to-identify-fake'] });
  const fallbackLabel = `${t.authenticity.howToDistinguish} placeholder`;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Suspense
        fallback={
          <section
            className="min-h-screen bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl mx-4 my-8"
            aria-label={fallbackLabel}
          />
        }
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                {t.authenticity.howToDistinguish}
              </h1>
              
              <div className="space-y-8">
                <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">
                    {t.authenticity.fakeWarning}
                  </h2>
                  <p className="text-red-700 dark:text-red-300 text-lg">
                    {t.authenticity.fakeWarningText}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
                      {t.authenticity.originalTitle}
                    </h3>
                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                      <li>{t.authenticity.originalFeature1}</li>
                      <li>{t.authenticity.originalFeature2}</li>
                      <li>{t.authenticity.originalFeature3}</li>
                      <li>{t.authenticity.originalFeature4}</li>
                      <li>{t.authenticity.originalFeature5}</li>
                    </ul>
                  </div>

                  <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4">
                      {t.authenticity.fakeTitle}
                    </h3>
                    <ul className="space-y-2 text-red-700 dark:text-red-300">
                      <li>{t.authenticity.fakeFeature1}</li>
                      <li>{t.authenticity.fakeFeature2}</li>
                      <li>{t.authenticity.fakeFeature3}</li>
                      <li>{t.authenticity.fakeFeature4}</li>
                      <li>{t.authenticity.fakeFeature5}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">
                    {t.authenticity.verificationTitle}
                  </h3>
                  <ol className="space-y-2 text-blue-700 dark:text-blue-300">
                    <li>{t.authenticity.verificationStep1}</li>
                    <li>{t.authenticity.verificationStep2}</li>
                    <li>{t.authenticity.verificationStep3}</li>
                    <li>{t.authenticity.verificationStep4}</li>
                  </ol>
                </div>

                <div className="text-center">
                  <a 
                    href={QR_VERIFICATION_URL} 
                    rel={QR_VERIFICATION_REL}
                    target="_blank"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    {t.authenticity.verifyButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default HowToIdentifyFakePage;
