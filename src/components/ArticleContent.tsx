import type { TranslationKeys } from '@/types/global';

type ArticleContentProps = {
  article: TranslationKeys['article'];
};

const ArticleContent = ({ article }: ArticleContentProps) => (
  <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-white py-12">
    <div className="container mx-auto max-w-5xl px-4 space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Samyun Wan Armenia
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">{article.title}</h1>
        <p className="mt-3 text-lg text-gray-600">{article.subtitle}</p>
        <p className="mt-6 text-base text-gray-700">{article.intro}</p>

        {article.sections.map(section => (
          <section key={section.id} className="mt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">{section.heading}</h2>
            <p className="text-gray-700">{section.description}</p>
            {section.bullets?.length ? (
              <ul className="ml-4 list-disc space-y-1 text-gray-700">
                {section.bullets.map((bullet, index) => (
                  <li key={`${section.id}-${index}`}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {article.conclusion ? (
          <p className="mt-10 text-lg font-medium text-gray-800">{article.conclusion}</p>
        ) : null}

        {article.ctaLabel && article.ctaLink ? (
          <div className="mt-6">
            <a
              href={article.ctaLink}
              className="inline-flex items-center rounded-full bg-amber-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-amber-700"
            >
              {article.ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  </main>
);

export default ArticleContent;
