"use client";

import Link from 'next/link';
import Image from 'next/image';

import type { BlogPreview } from '@/data/blogs';
import type { SupportedLang } from '@/config/locales';

interface BlogPreviewCardProps {
  preview: BlogPreview;
  lang: SupportedLang;
}

const formatDate = (value: string, lang: SupportedLang) => {
  const locale = lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(value),
  );
};

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ preview, lang }) => {
  const normalizedSrc =
    (preview.heroImage &&
      (preview.heroImage.startsWith('http') || preview.heroImage.startsWith('/images') || preview.heroImage.startsWith('/optimized')
        ? preview.heroImage
        : `/${preview.heroImage.replace(/^\/+/, '')}`)) ||
    '/optimized/og-image-1200x630.webp';
  const normalizedAlt = preview.heroImageAlt || preview.title;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 transition hover:-translate-y-1 hover:shadow-2xl">
      <Link
        href={`/${lang}/blogs/${preview.slug}`}
        className="group relative flex min-h-[220px] w-full flex-col-reverse justify-between p-6 sm:flex-row"
        aria-label={`${preview.title} (${lang})`}
      >
        <div className="flex-1 pr-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            {preview.category}
          </p>
          <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{preview.title}</h3>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">{preview.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {preview.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="rounded-full border border-primary-200 px-3 py-1 text-primary-600 dark:border-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(preview.publishedAt, lang)}</span>
            <span className="mx-2">•</span>
            <span>{preview.readingTimeMinutes} min read</span>
          </div>
        </div>

        <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <Image
            src={normalizedSrc}
            alt={normalizedAlt}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover transition duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      </Link>
    </article>
  );
};

export default BlogPreviewCard;
