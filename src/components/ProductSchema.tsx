import Script from 'next/script';

type ProductSchemaProps = {
  name: string;
  description: string;
  price: string;
};

const ProductSchema = ({ name, description, price }: ProductSchemaProps) => {
  const scriptId = `product-ld-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'item'}`;

  return (
    <Script id={scriptId} type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        brand: "Samyun Wan",
        offers: {
          "@type": "Offer",
          priceCurrency: "AMD",
          price,
          availability: "https://schema.org/InStock"
        }
      })}
    </Script>
  );
};

export default ProductSchema;
