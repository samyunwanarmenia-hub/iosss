"use client";

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonial } from '../types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import OptimizedImage from './OptimizedImage';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentLang: string;
}

const TestimonialsSection = ({ testimonials, currentLang }: TestimonialsSectionProps) => {
  const { t } = useLayoutContext();
  
  // Show only base testimonials - user reviews are sent to Telegram only
  const displayedTestimonials = testimonials.slice(0, 6);
  const reviewCount = testimonials.length;
  const averageRating =
    reviewCount === 0
      ? '0.00'
      : (testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0) / reviewCount).toFixed(2);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.section 
        id="testimonials" 
        className="relative py-12 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t.testimonials.title}
            subtitle={t.testimonials.subtitle}
          />

          <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-800 dark:text-gray-100">
            <div className="flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 shadow-sm dark:border-primary-700 dark:bg-gray-900">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-2xl font-semibold">{averageRating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/ 5</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {reviewCount} reviews
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {displayedTestimonials.map((testimonial: Testimonial) => (
              <InteractiveDiv 
                key={testimonial.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 group flex flex-col"
                variants={itemVariants}
                whileHoverScale={1.05}
                hoverY={-5} // Subtle lift
                hoverShadow="0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
              >
                <div className="flex items-center mb-3">
                  {/^https?:\/\//.test(testimonial.image) ? (
                    /* External avatar: use native img to avoid local optimization pipeline */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={testimonial.image}
                      alt={
                        currentLang === 'hy'
                          ? testimonial.name
                          : currentLang === 'ru'
                          ? testimonial.nameRu
                          : testimonial.nameEn
                      }
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  ) : (
                    <OptimizedImage
                      src={testimonial.image}
                      alt={
                        currentLang === 'hy'
                          ? testimonial.name
                          : currentLang === 'ru'
                          ? testimonial.nameRu
                          : testimonial.nameEn
                      }
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                      sizes="40px"
                    />
                  )}
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-gray-50 text-sm"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
                      {currentLang === 'hy' ? testimonial.name : currentLang === 'ru' ? testimonial.nameRu : testimonial.nameEn}
                    </h5>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={`${testimonial.id}-star-${i}`} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto bg-primary-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold dark:bg-primary-600">
                    {testimonial.result}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed flex-grow"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
                  {currentLang === 'hy' ? testimonial.textHy : currentLang === 'ru' ? testimonial.textRu : currentLang === 'en' ? testimonial.textEn : testimonial.textHy}
                </p>
              </InteractiveDiv>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default TestimonialsSection;
