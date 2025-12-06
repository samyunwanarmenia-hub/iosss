import { QR_VERIFICATION_URL, QR_VERIFICATION_REL } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { buildAlternates } from '@/utils/alternateLinks';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/verify/qr');
  return {
    ...buildPageMetadata(params.lang, 'verify/qr', { canonicalPath: alternates.canonical }),
    robots: {
      index: false,
      follow: true,
    },
    alternates,
  };
};

const QrVerifyPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['verify', 'qr'] });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
        <div className="max-w-xl rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900">{t.authenticity.qrScanInstructions}</h1>
          <p className="mt-3 text-gray-600">{t.authenticity.waitingForLink}</p>
          <a
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
            href={QR_VERIFICATION_URL}
            rel={QR_VERIFICATION_REL}
            target="_blank"
          >
            {t.authenticity.verifyButton}
          </a>
        </div>
      </main>
    </>
  );
};

export default QrVerifyPage;
