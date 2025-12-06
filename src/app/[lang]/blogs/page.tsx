import type { Metadata } from 'next';

import fs from 'fs';
import path from 'path';

import { translations } from '@/i18n/translations';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { getBlogPreviews } from '@/data/blogs';
import { generateArticleSchema, buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { SITE_URL } from '@/config/siteConfig';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }): Metadata => {
  const alternates = buildAlternates('/blogs');
  return {
    ...buildPageMetadata(params.lang, 'blogs', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

const blogsHtmlPath = path.join(process.cwd(), 'tmp_hy_blogs.html');

const extractBlogsHtml = () => {
  try {
    const html = fs.readFileSync(blogsHtmlPath, 'utf8');

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch?.[1] ?? html;

    const styleBlocks = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)).map(
      match => match[1] ?? '',
    );

    const inlineStyles = [
      "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');",
      "@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');",
      "@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');",
      ...styleBlocks,
    ]
      .filter(Boolean)
      .join('\n');

    const cleanedBody = bodyHtml.replace(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      '',
    );
    const sanitizedBody = cleanedBody
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '');

    return { bodyHtml: sanitizedBody, inlineStyles };
  } catch (error) {
    console.error('Failed to read blogs HTML file:', error);
    return {
      bodyHtml: '<main class="container py-10"><p>Content unavailable.</p></main>',
      inlineStyles: '',
    };
  }
};

const BlogsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const previews = getBlogPreviews(lang);
  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['blogs'] });

  const inLanguage = lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US';
  const featured = previews[0];
  const articleSchema = generateArticleSchema({
    headline: t.article.metaTitle,
    description: t.article.metaDescription,
    image:
      featured?.heroImage?.startsWith('http') || !featured?.heroImage
        ? featured?.heroImage ?? `${SITE_URL}/optimized/og-image-1200x630.webp`
        : `${SITE_URL}${featured.heroImage}`,
    url: `${SITE_URL}/${lang}/blogs`,
    authorName: 'Samyun Wan Armenia',
    datePublished: featured?.publishedAt ?? new Date().toISOString(),
    publisherName: 'Samyun Wan Armenia',
    inLanguage,
  });

  const { bodyHtml, inlineStyles } = extractBlogsHtml();

  return (
    <>
      <ScriptLD json={articleSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {inlineStyles ? (
        <style id="blogs-inline-styles" dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
};

export default BlogsPage;
