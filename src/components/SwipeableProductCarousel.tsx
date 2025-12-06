import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { TranslationKeys, ProductShowcaseItem, OpenOrderModalFunction } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import { translations } from '@/i18n/translations';

interface SwipeableProductCarouselProps {
  t: TranslationKeys;
  openOrderModal: OpenOrderModalFunction;
}

const SwipeableProductCarousel: React.FC<SwipeableProductCarouselProps> = ({ t, openOrderModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: no change, 1: next, -1: prev
  const touchStartX = useRef(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % productShowcaseData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex: number) =>
      (prevIndex - 1 + productShowcaseData.length) % productShowcaseData.length
    );
  };

  const currentProduct: ProductShowcaseItem = productShowcaseData[currentIndex];
  const fallbackEnAlt =
    currentProduct.altKey && translations.en?.productShowcase?.[currentProduct.altKey as keyof typeof translations.en.productShowcase];
  const currentAlt =
    (currentProduct.altKey && t.productShowcase[currentProduct.altKey]) ||
    fallbackEnAlt ||
    currentProduct.alt ||
    t.productShowcase.weightGainDesc;

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;
    const minSwipeDistance = 50; // Minimum pixels to register a swipe

    if (swipeDistance > minSwipeDistance) {
      handlePrev();
    } else if (swipeDistance < -minSwipeDistance) {
      handleNext();
    }
  };

  return (
    <div
      className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[450px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex flex-col items-center justify-center p-6 group"
        >
          <InteractiveDiv
            className="relative w-full h-full max-w-[300px] max-h-[450px] p-6 rounded-2xl overflow-hidden
                       bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       flex flex-col items-center justify-center text-center"
            initial={{ boxShadow: "none" }}
            whileHoverScale={1.03}
            hoverShadow="0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1), var(--tw-shadow-glow-green)" // More pronounced shadow with glow
          >
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500
                         bg-[radial-gradient(circle_at_80px_40px,_rgba(255,255,255,0.8),_transparent)]
                         opacity-0 group-hover:opacity-40"
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mb-4"
            >
              <OptimizedImage
                src={currentProduct.src}
                alt={currentAlt}
                className="w-28 h-28 object-contain drop-shadow-lg" 
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 112px, 150px" 
              />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50 mb-2 text-center"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
              {t.productShowcase[currentProduct.labelKey]}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
              {t.productShowcase[currentProduct.descKey]}
            </p>
            <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400 mb-4">
              {currentProduct.price.toLocaleString()} AMD
            </p>
            <CallToActionButton
              onClick={() => openOrderModal(currentProduct.labelKey)}
              icon={ShoppingCart}
              variant="primary"
              size="md"
              gaEvent={{ category: 'Order', action: 'Click_ProductCarousel_Order', label: currentProduct.labelKey }}
              ymEvent={{ category: 'Order', action: 'Click_ProductCarousel_Order', label: currentProduct.labelKey }}
            >
              {t.productShowcase[currentProduct.buttonTextKey]}
            </CallToActionButton>
          </InteractiveDiv>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 transform bg-gray-100 dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-600 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-20"
        aria-label="Previous product"
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 transform bg-gray-100 dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-600 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-20"
        aria-label="Next product"
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SwipeableProductCarousel;
