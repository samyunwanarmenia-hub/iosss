import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

import blogPostsJson from '@/data/blogs/blogPosts.json';
import { DEFAULT_LANG, SUPPORTED_LANGS, type SupportedLang } from '@/config/locales';

marked.use({
  mangle: false,
  headerIds: false,
});


type BlogSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

type RawTranslation = {
  title?: string;
  subtitle?: string;
  summary?: string;
  sections?: BlogSection[];
  heroImage?: string;
  heroImageAlt?: string;
  tags?: string[];
  markdownPath?: string;
};

interface RawBlogPost {
  slug: string;
  publishedAt: string;
  category: string;
  author: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth: number;
  heroImageHeight: number;
  tags: string[];
  translations: Record<SupportedLang, RawTranslation>;
}

export interface BlogTranslation {
  title: string;
  subtitle: string;
  summary: string;
  sections: BlogSection[];
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth: number;
  heroImageHeight: number;
  tags: string[];
  htmlContent?: string;
}

export interface BlogPost {
  slug: string;
  publishedAt: string;
  category: string;
  author: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth: number;
  heroImageHeight: number;
  tags: string[];
  readingTimeMinutes: number;
  translations: Record<SupportedLang, BlogTranslation>;
}

type MarkdownCacheEntry = {
  html: string;
  frontMatter: Record<string, unknown>;
};

const markdownCache = new Map<string, MarkdownCacheEntry>();

const readMarkdown = (relativePath?: string): MarkdownCacheEntry | null => {
  if (!relativePath) {
    return null;
  }

  const normalizedPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  const absolutePath = path.join(process.cwd(), normalizedPath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  if (markdownCache.has(absolutePath)) {
    return markdownCache.get(absolutePath)!;
  }

  const fileContents = fs.readFileSync(absolutePath, 'utf8');
  const parsed = matter(fileContents);
  const html = marked.parse(parsed.content);
  const entry: MarkdownCacheEntry = {
    html,
    frontMatter: parsed.data as Record<string, unknown>,
  };

  markdownCache.set(absolutePath, entry);
  return entry;
};

const mergeTags = (postTags: string[], translationTags?: string[]) => {
  const combined = [...postTags, ...(translationTags ?? [])];
  return Array.from(new Set(combined)).map(tag => tag.trim()).filter(Boolean);
};

const normalizeTranslation = (
  post: RawBlogPost,
  lang: SupportedLang,
  translationConfig: RawTranslation
): BlogTranslation => {
  const markdown = readMarkdown(translationConfig.markdownPath);
  const fm = markdown?.frontMatter ?? {};

  const heroImage = translationConfig.heroImage ?? post.heroImage;
  const heroImageAlt = translationConfig.heroImageAlt ?? post.heroImageAlt;

  const sections = translationConfig.sections ?? [];

  return {
    title: (fm.title as string) ?? translationConfig.title ?? post.category,
    subtitle: (fm.subtitle as string) ?? translationConfig.subtitle ?? '',
    summary: (fm.summary as string) ?? translationConfig.summary ?? '',
    sections,
    heroImage,
    heroImageAlt,
    heroImageWidth: post.heroImageWidth,
    heroImageHeight: post.heroImageHeight,
    tags: mergeTags(post.tags, translationConfig.tags),
    htmlContent: markdown?.html ?? undefined,
  };
};

const estimateReadingTime = (translation: BlogTranslation): number => {
  const textSegments = [
    translation.summary,
    ...translation.sections.map(section => section.body),
    translation.htmlContent ?? '',
  ];
  const words = textSegments
    .join(' ')
    .split(/\s+/)
    .filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 180));
};

const rawPosts = blogPostsJson as RawBlogPost[];

const BLOG_POSTS: BlogPost[] = rawPosts.map(post => {
  const translations: Record<SupportedLang, BlogTranslation> = {} as Record<SupportedLang, BlogTranslation>;

  SUPPORTED_LANGS.forEach(lang => {
    const translationConfig = post.translations[lang] ?? post.translations[DEFAULT_LANG];
    translations[lang] = normalizeTranslation(post, lang, translationConfig);
  });

  const readingTimeMinutes = estimateReadingTime(translations[DEFAULT_LANG]);

  return {
    ...post,
    readingTimeMinutes,
    translations,
  };
});

export const getBlogPosts = () => BLOG_POSTS;

export const getBlogPost = (slug: string) => BLOG_POSTS.find(post => post.slug === slug);

export const getBlogStaticParams = () =>
  BLOG_POSTS.flatMap(post =>
    SUPPORTED_LANGS.map(lang => ({
      lang,
      slug: post.slug,
    })),
  );

export interface BlogPreview {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth: number;
  heroImageHeight: number;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
}

export const getBlogPreviews = (lang: SupportedLang): BlogPreview[] =>
  BLOG_POSTS.map(post => ({
    slug: post.slug,
    title: post.translations[lang].title,
    subtitle: post.translations[lang].subtitle,
    summary: post.translations[lang].summary,
    heroImage: post.translations[lang].heroImage,
    heroImageAlt: post.translations[lang].heroImageAlt,
    heroImageWidth: post.translations[lang].heroImageWidth,
    heroImageHeight: post.translations[lang].heroImageHeight,
    category: post.category,
    tags: post.translations[lang].tags,
    publishedAt: post.publishedAt,
    readingTimeMinutes: post.readingTimeMinutes,
  }));
