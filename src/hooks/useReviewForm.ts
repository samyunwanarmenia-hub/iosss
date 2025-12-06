"use client";

import { useState, useCallback, useEffect } from 'react';
import { UseReviewFormHookParams } from '@/types/global';
import { showError } from '@/utils/toast';

export const useReviewForm = ({ onReviewSubmitted, initialName = '' }: UseReviewFormHookParams) => {
  const [name, setName] = useState<string>(initialName);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create review object without saving to database
      const reviewData = {
        id: `review-${Date.now()}`,
        user_id: null,
        name: name.trim(),
        text: reviewText.trim(),
        rating: 5,
        created_at: new Date().toISOString(),
      };

      // Clear form
      if (!initialName) {
        setName('');
      }
      setReviewText('');

      // Send to Telegram only
      onReviewSubmitted(reviewData);

    } catch (error: unknown) {
      console.error("Error submitting review:", error instanceof Error ? error.message : error);
      showError(error instanceof Error ? error.message : "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, reviewText, onReviewSubmitted, initialName]);

  return {
    name,
    setName,
    reviewText,
    setReviewText,
    isSubmitting,
    handleSubmit,
  };
};
