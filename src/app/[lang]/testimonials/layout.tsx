import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { baseTestimonials } from '@/data/testimonials';
import { generateReviewStructuredData } from '@/utils/structuredDataUtils';
import { TestimonialsLayoutProps } from '@/types/global';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import ScriptLD from '@/components/ScriptLD';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const reviewKeywords = baseTestimonials
    .map(item => (lang === 'hy' ? item.name : lang === 'ru' ? item.nameRu : item.nameEn))
    .join(', ');

  const pageTitle = `${t.hero.title} - ${t.testimonials.title}`;
  const pageDescription = t.testimonials.formSubtitle;
  const pageKeywords = [
    t.hero.title,
    t.testimonials.title,
    'Samyun Wan Armenia отзывы',
    'Samyun Wan կարծիքներ',
    reviewKeywords,
  ];
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;
  const pageImageAlt = t.testimonials.title;

  return generatePageMetadata({
    lang,
    titleKey: 'testimonials.title',
    descriptionKey: 'testimonials.formSubtitle',
    keywords: pageKeywords,
    pagePath: 'testimonials',
    image: pageImage,
    imageAlt: pageImageAlt,
    type: 'website',
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const TestimonialsLayout = ({ children, params }: TestimonialsLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];
  const reviewStructuredData = baseTestimonials.map(testimonial =>
    generateReviewStructuredData(t, testimonial, lang),
  );

  return (
    <>
      {reviewStructuredData.map((data, index) => (
        <ScriptLD key={`review-schema-${index}`} json={data} />
      ))}
      {children}
    </>
  );
};

export default TestimonialsLayout;
