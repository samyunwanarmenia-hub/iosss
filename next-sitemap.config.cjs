/** @type {import('next-sitemap').IConfig} */

const DEFAULT_SITE_URL = 'https://samyun-wan.life';

const BLOG_POSTS = require('./src/data/blogs/blogPosts.json');

const SUPPORTED_LANGS = ['hy', 'ru', 'en'];
const LOCALE_CODES = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US',
};

// Default language for x-default hreflang entries
const DEFAULT_LANG = 'hy';

const ROOT_ENTRY = { changefreq: 'weekly', priority: 0.9 };
const NOW_ISO = new Date().toISOString();

const normalizeLastmod = value => {
  const candidate = new Date(value);
  if (isNaN(candidate.getTime())) {
    return NOW_ISO;
  }

  const now = new Date();
  return candidate > now ? NOW_ISO : candidate.toISOString();
};

const SITE_PAGES = [
  { path: '', changefreq: 'weekly', priority: 0.9 },
  { path: 'about', changefreq: 'monthly', priority: 0.5 },
  { path: 'benefits', changefreq: 'monthly', priority: 0.8 },
  { path: 'products', changefreq: 'weekly', priority: 1.0 },
  { path: 'testimonials', changefreq: 'monthly', priority: 0.7 },
  { path: 'faq', changefreq: 'monthly', priority: 0.7 },
  { path: 'contact', changefreq: 'weekly', priority: 0.7 },
  { path: 'track-order', changefreq: 'weekly', priority: 0.7 },
  { path: 'blogs', changefreq: 'weekly', priority: 0.9 },
  { path: 'how-to-identify-fake', changefreq: 'weekly', priority: 0.9 },
  { path: 'privacy', changefreq: 'monthly', priority: 0.4 },
  { path: 'terms', changefreq: 'monthly', priority: 0.4 },
];

const normalizeUrl = url => url.replace(/\/+$/, '');

const formatSegments = segments =>
  segments
    .flatMap(segment => segment.split('/'))
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean);

// Build URL for each language page
const buildLocalizedUrl = (baseUrl, lang, segments = []) => {
  const sanitizedSegments = formatSegments(segments);
  const languageSegment = lang ? `/${lang}` : '';
  const path = sanitizedSegments.length ? `/${sanitizedSegments.join('/')}` : '';

  return `${baseUrl}${languageSegment}${path}`.replace(/\/+$/, '');
};

// hreflang mapping (correct schema for Google)
const buildAlternateRefs = (baseUrl, segments) => {
  const sanitizedSegments = formatSegments(segments);

  const refs = SUPPORTED_LANGS.map(lang => ({
    hreflang: LOCALE_CODES[lang],
    href: buildLocalizedUrl(baseUrl, lang, sanitizedSegments),
    hrefIsAbsolute: true,
  }));

  refs.push({
    hreflang: 'x-default',
    href: buildLocalizedUrl(baseUrl, DEFAULT_LANG, sanitizedSegments),
    hrefIsAbsolute: true,
  });

  return refs;
};

// Entry for each actual page
const createLocalizedEntry = (baseUrl, lang, page) => ({
  loc: buildLocalizedUrl(baseUrl, lang, [page.path]),
  changefreq: page.changefreq,
  priority: page.priority,
  lastmod: NOW_ISO,
  alternateRefs: buildAlternateRefs(baseUrl, [page.path]),
});

// Homepage entry
const createRootEntry = baseUrl => ({
  loc: baseUrl,
  changefreq: ROOT_ENTRY.changefreq,
  priority: ROOT_ENTRY.priority,
  lastmod: NOW_ISO,
  alternateRefs: buildAlternateRefs(baseUrl, []),
});

const createBlogPostEntries = baseUrl =>
  BLOG_POSTS.flatMap(post =>
    SUPPORTED_LANGS.map(lang => ({
      loc: buildLocalizedUrl(baseUrl, lang, ['blogs', post.slug]),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: normalizeLastmod(post.publishedAt),
      alternateRefs: buildAlternateRefs(baseUrl, ['blogs', post.slug]),
    })),
  );

module.exports = {
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),

  generateRobotsTxt: true,
  outDir: './public',
  sitemapSize: 50,

  autoLastmod: true,
  changefreq: 'weekly',
  priority: 0.7,

  additionalPaths: async config => {
    const baseUrl = normalizeUrl(config.siteUrl);
    const entries = [];

    // Homepage
    entries.push(createRootEntry(baseUrl));

    // All pages for all languages
    SITE_PAGES.forEach(page => {
      SUPPORTED_LANGS.forEach(lang => {
        entries.push(createLocalizedEntry(baseUrl, lang, page));
      });
    });

    entries.push(...createBlogPostEntries(baseUrl));
    return entries;
  },
};
