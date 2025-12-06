import Script from 'next/script';

export type BreadcrumbItem = {
  name: string;
  url: string;
};

const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name,
      },
    })),
  };

  const id = `breadcrumbs-${items.map(item => item.name).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <Script id={id || 'breadcrumbs'} type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  );
};

export default BreadcrumbSchema;
