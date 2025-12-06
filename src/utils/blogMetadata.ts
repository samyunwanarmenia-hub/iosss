import { Metadata } from 'next';

import { generateCommonMetadata } from '@/utils/metadataUtils';
import { translations } from '@/i18n/translations';
import { resolveLang as normalizeLang, LOCALE_CODES } from '@/config/locales';
import { BlogPost, BlogTranslation } from '@/data/blogs';
import { SITE_URL } from '@/config/siteConfig';

interface BlogMetadataOptions {
  lang: string;
  slug: string;
  post: BlogPost;
  translation: BlogTranslation;
  canonicalPath?: string;
}

interface ArticleSchemaOptions {
  lang: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}

export const buildArticleJsonLd = ({
  lang,
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleSchemaOptions) => {
  const normalizedLang = normalizeLang(lang);
  const pageUrl = `${SITE_URL}/${normalizedLang}/blogs/${slug}`;
  const logo = `${SITE_URL}/optimized/logo.png`;
  const langCode = LOCALE_CODES[normalizedLang];
  const blogUrl = `${SITE_URL}/${normalizedLang}/blogs`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: title,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Samyun Wan Armenia',
      logo: {
        '@type': 'ImageObject',
        url: logo,
      },
    },
    inLanguage: langCode,
    isPartOf: {
      '@type': 'Blog',
      '@id': blogUrl,
      name: 'Samyun Wan Armenia Blog',
      url: blogUrl,
    },
  };
};

export const buildBlogPostMetadata = ({
  lang,
  slug,
  post,
  translation,
  canonicalPath,
}: BlogMetadataOptions): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;
  const keywords = [...translation.tags, ...post.tags].join(', ');
  const canonical = canonicalPath ?? `/hy/blogs/${slug}`;

  return generateCommonMetadata({
    lang: normalizedLang,
    t,
    pagePath: `blogs/${slug}`,
    title: translation.title,
    description: translation.summary,
    keywords,
    image: translation.heroImage,
    imageAlt: translation.heroImageAlt,
    type: 'article',
    canonicalPath: canonical,
  });
};
