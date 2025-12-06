"use client";

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Sprout } from 'lucide-react';

import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import { productShowcaseData } from '@/data/productShowcaseData';
import CallToActionButton from './CallToActionButton';
import OptimizedImage from './OptimizedImage';

const ProductShowcaseSection = () => {
  const { t, openOrderModal } = useLayoutContext();

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.section
      id="products"
      className="relative bg-[var(--background)] py-16 sm:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container space-y-8">
        <SectionHeader title={t.nav.products} />

        <div className="relative overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(63,127,74,0.08),transparent_45%),radial-gradient(circle_at_90%_15%,rgba(203,170,112,0.08),transparent_45%)]" />
          <div className="relative text-center space-y-2">
            <h2 className="text-[30px] font-semibold text-[var(--text-primary)]">{t.productShowcase.seoHeading}</h2>
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <Sprout className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">{t.productShowcase.seoSubheading}</h3>
            </div>
            <p className="text-[16px] leading-[1.5] text-[var(--text-secondary)]">
              {t.productShowcase.seoParagraph}
            </p>
          </div>
        </div>

        <div className="product-carousel swiper">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop
            speed={600}
            effect="slide"
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {productShowcaseData.map((product, index) => {
              const label = t.productShowcase[product.labelKey];
              const description = t.productShowcase[product.descKey];
              const altText = t.productShowcase[product.altKey ?? 'weightGainAlt'];

              return (
                <SwiperSlide key={product.labelKey} className="swiper-slide">
                  <motion.article
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.05 * index }}
                    className="product-card relative flex h-full flex-col rounded-xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 shadow-[0_6px_26px_rgba(28,36,32,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="absolute right-4 top-4 rounded-full bg-[var(--muted-surface)] p-2 text-[var(--accent)] shadow-sm" aria-hidden>
                      <Sprout className="h-4 w-4" />
                    </div>
                    <OptimizedImage
                      src={product.src}
                      alt={altText}
                      className="mx-auto h-40 w-full max-w-[240px] object-contain"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                    />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{label}</h3>
                        <span className="text-sm font-semibold text-[var(--accent)]">
                          {product.price.toLocaleString()} AMD
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
                    </div>
                    <CallToActionButton
                      onClick={() => openOrderModal(product.labelKey)}
                      variant="primary"
                      size="md"
                      gaEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                      ymEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                      className="mt-4 w-full"
                    >
                      {t.hero.cta}
                    </CallToActionButton>
                  </motion.article>
                </SwiperSlide>
              );
            })}
            <div className="swiper-pagination !relative mt-6" />
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;
