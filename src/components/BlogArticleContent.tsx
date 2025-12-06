import Image from 'next/image';
import type { BlogTranslation } from '@/data/blogs';

interface BlogArticleContentProps {
  translation: BlogTranslation;
  publishedAt: string;
  readingTimeMinutes: number;
  lang: 'hy' | 'ru' | 'en';
}

const formatDate = (value: string, lang: BlogArticleContentProps['lang']) => {
  const locale = lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(value),
  );
};

const BlogArticleContent = ({
  translation,
  publishedAt,
  readingTimeMinutes,
  lang,
}: BlogArticleContentProps) => {
  const heroSrc =
    (translation.heroImage &&
      (translation.heroImage.startsWith('http') || translation.heroImage.startsWith('/images') || translation.heroImage.startsWith('/optimized')
        ? translation.heroImage
        : `/${translation.heroImage.replace(/^\/+/, '')}`)) ||
    '/optimized/og-image-1200x630.webp';
  const heroAlt = translation.heroImageAlt || translation.title;
  const heroWidth = translation.heroImageWidth || 1200;
  const heroHeight = translation.heroImageHeight || 630;

  return (
    <article className="space-y-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-950">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
        <Image
          src={heroSrc}
          alt={heroAlt}
          width={heroWidth}
          height={heroHeight}
          sizes="(max-width: 768px) 100vw, 900px"
          priority
          className="h-auto w-full object-cover"
          unoptimized
        />
      </div>

      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary-600 dark:text-primary-300">
        {formatDate(publishedAt, lang)} • {readingTimeMinutes} min read
      </p>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{translation.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">{translation.subtitle}</p>
      <p className="text-base text-gray-800 dark:text-gray-200">{translation.summary}</p>

      {translation.sections.map(section => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.heading}</h2>
          <p className="text-gray-700 dark:text-gray-200">{section.body}</p>
          {section.bullets?.length ? (
            <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
              {section.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {translation.htmlContent ? (
        <div
          className="prose max-w-none text-gray-700 dark:text-gray-200 prose-a:text-primary-600 dark:prose-a:text-primary-400"
          dangerouslySetInnerHTML={{ __html: translation.htmlContent }}
        />
      ) : null}
    </article>
  );
};

export default BlogArticleContent;
