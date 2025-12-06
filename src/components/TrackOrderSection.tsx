"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react'; // Removed Package, Clock, MapPin, User as they are no longer used
import SectionHeader from './SectionHeader';
import CallToActionButton from './CallToActionButton';
import { useLayoutContext } from '@/context/LayoutContext';
import LoadingSpinner from './LoadingSpinner';
import { showError } from '@/utils/toast';

const TrackOrderSection = () => {
  const { t } = useLayoutContext();
  const [orderId, setOrderId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Keep error for input validation

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!orderId.trim()) {
      showError(t.trackOrder.noOrderId);
      setError(t.trackOrder.noOrderId); // Set error for display
      return;
    }

    setIsLoading(true);
    
    // Simulate a small delay for UX feedback, then redirect
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const haypostTrackingUrl = `https://www.haypost.am/am/track-trace#${orderId.trim()}`;
    window.open(haypostTrackingUrl, '_blank'); // Open in a new tab

    setIsLoading(false);
    setOrderId(''); // Clear the input field after redirection
  };

  return (
    <motion.section
      id="track-order"
      className="relative py-12 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <SectionHeader
          title={t.nav.trackOrder}
          subtitle={t.trackOrder.subtitle}
        />

        <motion.form
          onSubmit={handleTrackOrder}
          className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <motion.input
              type="text"
              className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600" /* Changed text-gray-900 to text-gray-800 for light mode */
              placeholder={t.trackOrder.orderIdPlaceholder}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              whileFocus={{ scale: 1.01, borderColor: '#6c906c' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </div>
          <CallToActionButton
            type="submit"
            icon={Search}
            disabled={isLoading}
            size="md"
            interactionEffect="pixels"
            gaEvent={{ category: 'OrderTracking', action: 'Click_TrackOrder' }}
            ymEvent={{ category: 'OrderTracking', action: 'Click_TrackOrder' }}
          >
            {isLoading ? <LoadingSpinner /> : t.trackOrder.trackButton}
          </CallToActionButton>
        </motion.form>

        {isLoading && (
          <motion.div
            className="flex justify-center items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSpinner />
            {/* Show loading message while processing order */}
            <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">{t.trackOrder.processingRequest}</p>
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div
            className="p-6 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-2xl shadow-xl border border-red-200 dark:border-red-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold">{error}</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TrackOrderSection;