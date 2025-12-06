"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { DbReview } from '../types/global';
import CallToActionButton from './CallToActionButton';
import { useLayoutContext } from '@/context/LayoutContext';
import { useReviewForm } from '@/hooks/useReviewForm';
import { motion } from 'framer-motion'; // Import motion

interface ReviewFormProps {
  onReviewSubmitted: (review: DbReview) => void;
}

const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const { t } = useLayoutContext();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    name,
    setName,
    reviewText,
    setReviewText,
    isSubmitting,
    handleSubmit,
  } = useReviewForm({
    t,
    onReviewSubmitted: (review) => {
      onReviewSubmitted(review);
      setShowForm(false);
      setSubmitted(true);
    },
    initialName: '', // No initial name from user auth
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-800 dark:text-gray-50"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
            {t.testimonials.formTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
            {t.testimonials.formSubtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-primary-600 text-white p-5 rounded-xl text-center text-base font-semibold dark:bg-primary-700">
            {t.testimonials.thankYou}
          </div>
        ) : (
          <>
            {!showForm && (
              <motion.div 
                className="flex justify-center"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <CallToActionButton
                  onClick={() => setShowForm(true)}
                  icon={Send}
                  size="md"
                  interactionEffect="burst"
                  gaEvent={{ category: 'Review', action: 'Click_OpenReviewForm' }}
                  ymEvent={{ category: 'Review', action: 'Click_OpenReviewForm' }}
                >
                  {t.testimonials.formTitle}
                </CallToActionButton>
              </motion.div>
            )}

            {showForm && (
              <motion.form 
                onSubmit={handleSubmit} 
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="mb-5" variants={itemVariants}>
                  <label htmlFor="name" className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
                    {t.testimonials.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border border-gray-200 dark:border-gray-600 rounded-lg w-full py-2.5 px-3 text-gray-800 dark:text-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400" /* Changed text-gray-900 to text-gray-800 for light mode */
                    placeholder={t.testimonials.namePlaceholder}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                  />
                </motion.div>
                <motion.div className="mb-5" variants={itemVariants}>
                  <label htmlFor="review" className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
                    {t.testimonials.reviewPlaceholder}
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    className="shadow appearance-none border border-gray-200 dark:border-gray-600 rounded-lg w-full py-2.5 px-3 text-gray-800 dark:text-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 resize-none" /* Changed text-gray-900 to text-gray-800 for light mode */
                    placeholder={t.testimonials.reviewPlaceholder}
                    value={reviewText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center space-x-3"
                  variants={itemVariants}
                >
                  <CallToActionButton
                    type="submit"
                    icon={Send}
                    size="md"
                    disabled={isSubmitting}
                    interactionEffect="pixels"
                    gaEvent={{ category: 'Review', action: 'Click_SubmitReview' }}
                    ymEvent={{ category: 'Review', action: 'Click_SubmitReview' }}
                  >
                    {t.testimonials.submitButton}
                  </CallToActionButton>
                  <CallToActionButton
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="subtle"
                    size="md"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </CallToActionButton>
                </motion.div>
              </motion.form>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewForm;