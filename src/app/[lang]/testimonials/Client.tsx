"use client";

import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewForm from '@/components/ReviewForm';
import { useLayoutContext } from '@/context/LayoutContext';
import { DbReview } from '@/types/global';
import { useMemo } from 'react';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';
import { baseTestimonials } from '@/data/testimonials';
import { formatNameInitialLastName } from '@/utils/testimonialGenerator';

const TestimonialsPageClient = () => {
  const { t, currentLang } = useLayoutContext();

  const combinedTestimonials = useMemo(() => {
    const unique = Array.from(new Map(baseTestimonials.map(item => [item.id, item])).values());
    return unique.map(testimonial => ({
      ...testimonial,
      name: formatNameInitialLastName(testimonial.name),
      nameRu: formatNameInitialLastName(testimonial.nameRu),
      nameEn: formatNameInitialLastName(testimonial.nameEn),
    }));
  }, []);

  const handleReviewSubmitted = async (newReview: DbReview) => {
    try {
      // Send only to Telegram - do not publish on the page
      const telegramMessage = `<b>🌟 Новый отзыв!</b>\n\n<b>Имя:</b> ${newReview.name}\n<b>Отзыв:</b> ${newReview.text}\n<b>Рейтинг:</b> ${newReview.rating || 5}/5\n\n<b>Язык:</b> ${currentLang.toUpperCase()}`;
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.testimonials.thankYou);
    } catch (error: unknown) {
      console.error('Error sending review to Telegram:', error);
      showError(error instanceof Error ? error.message : 'Failed to send review notification.');
    }
  };

  return (
    <>
      <TestimonialsSection
        testimonials={combinedTestimonials}
        currentLang={currentLang}
      />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
    </>
  );
};

export default TestimonialsPageClient;
