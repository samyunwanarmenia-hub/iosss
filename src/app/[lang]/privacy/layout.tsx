import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} | Privacy Policy`;
  const pageDescription =
    'Политика конфиденциальности Samyun Wan Armenia. Узнайте, как мы защищаем личные данные клиентов и обеспечиваем безопасные покупки.';
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;

  return generatePageMetadata({
    lang,
    titleKey: 'privacy.title',
    descriptionKey: 'privacy.description',
    keywords: [`${t.hero.title}`, 'privacy policy', 'Samyun Wan Armenia'],
    pagePath: 'privacy',
    image: pageImage,
    imageAlt: pageTitle,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PrivacyLayout;
