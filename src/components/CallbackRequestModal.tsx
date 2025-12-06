"use client";

import { useState } from 'react';
import { User, Phone, Send } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import CallToActionButton from './CallToActionButton';
import { ProductType, CallbackPurpose, CallbackRequestModalProps } from '@/types/global';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';
import { motion } from 'framer-motion'; // Import motion
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import { trackGAEvent, trackGoogleAdsConversion } from '@/utils/analytics';

const CallbackRequestModal: React.FC<CallbackRequestModalProps> = ({ isOpen, onClose, t, currentLang }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [productType, setProductType] = useState<ProductType>('');
  const [purpose, setPurpose] = useState<CallbackPurpose>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim() || !phone.trim() || !productType || !purpose) {
      showError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(phone)) {
      showError(t.callbackRequest.invalidPhone);
      setIsSubmitting(false);
      return;
    }

    const productTypeTranslated = productType === 'weightGain' ? t.callbackRequest.weightGainOption : t.callbackRequest.weightLossOption;
    let purposeTranslated = '';
    if (purpose === 'details') purposeTranslated = t.callbackRequest.purposeDetails;
    else if (purpose === 'orders') purposeTranslated = t.callbackRequest.purposeOrders;
    else if (purpose === 'other') purposeTranslated = t.callbackRequest.purposeOther;

    const telegramMessage = `<b>New Callback Request!</b>\n\n` +
                            `<b>Name:</b> ${name}\n` +
                            `<b>Phone:</b> ${phone}\n` +
                            `<b>Product Type:</b> ${productTypeTranslated}\n` +
                            `<b>Purpose:</b> ${purposeTranslated}\n` +
                            `<b>Language:</b> ${currentLang.toUpperCase()}`;

    try {
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.callbackRequest.successMessage);
      setName('');
      setPhone('');
      setProductType('');
      setPurpose('');
      onClose();

      // Analytics event for successful callback request
      trackGAEvent({
        action: 'Submit_CallbackRequest_Success',
        category: 'Callback_Request',
        label: `${productTypeTranslated} - ${purposeTranslated}`,
      });
      trackGoogleAdsConversion({ label: 'Submit_CallbackRequest_Success' });
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(103962073, 'reachGoal', 'Submit_CallbackRequest_Success', {
          category: 'Callback_Request',
          label: `${productTypeTranslated} - ${purposeTranslated}`,
        });
      }

    } catch (error: unknown) {
      console.error("Error submitting callback request:", error);
      showError(error instanceof Error ? error.message : "Failed to send callback request. Please try again.");
      // Analytics event for failed callback request
      trackGAEvent({
        action: 'Submit_CallbackRequest_Failure',
        category: 'Callback_Request',
        label: error instanceof Error ? error.message : 'Unknown Error',
      });
      trackGoogleAdsConversion({ label: 'Submit_CallbackRequest_Failure' });
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(103962073, 'reachGoal', 'Submit_CallbackRequest_Failure', {
          category: 'Callback_Request',
          label: error instanceof Error ? error.message : 'Unknown Error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.callbackRequest.title}
      maxWidth="max-w-md"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="flex flex-col space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600" /* Changed text-gray-900 to text-gray-800 for light mode */
            placeholder={t.callbackRequest.namePlaceholder}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </motion.div>
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="tel"
            className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600" /* Changed text-gray-900 to text-gray-800 for light mode */
            placeholder={t.callbackRequest.phonePlaceholder}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
            {t.callbackRequest.productTypeLabel}
          </label>
          <div className="flex flex-col space-y-2">
            <InteractiveDiv 
              className="inline-flex items-center"
              whileHoverScale={1.02}
              hoverY={0}
              hoverShadow="none"
            >
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="productType"
                value="weightGain"
                checked={productType === 'weightGain'}
                onChange={() => setProductType('weightGain')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-base">{t.callbackRequest.weightGainOption}</span>
            </InteractiveDiv>
            <InteractiveDiv 
              className="inline-flex items-center"
              whileHoverScale={1.02}
              hoverY={0}
              hoverShadow="none"
            >
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="productType"
                value="weightLoss"
                checked={productType === 'weightLoss'}
                onChange={() => setProductType('weightLoss')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-base">{t.callbackRequest.weightLossOption}</span>
            </InteractiveDiv>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
            {t.callbackRequest.purposeLabel}
          </label>
          <div className="flex flex-col space-y-2">
            <InteractiveDiv 
              className="inline-flex items-center"
              whileHoverScale={1.02}
              hoverY={0}
              hoverShadow="none"
            >
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="details"
                checked={purpose === 'details'}
                onChange={() => setPurpose('details')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-base">{t.callbackRequest.purposeDetails}</span>
            </InteractiveDiv>
            <InteractiveDiv 
              className="inline-flex items-center"
              whileHoverScale={1.02}
              hoverY={0}
              hoverShadow="none"
            >
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="orders"
                checked={purpose === 'orders'}
                onChange={() => setPurpose('orders')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-base">{t.callbackRequest.purposeOrders}</span>
            </InteractiveDiv>
            <InteractiveDiv 
              className="inline-flex items-center"
              whileHoverScale={1.02}
              hoverY={0}
              hoverShadow="none"
            >
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="other"
                checked={purpose === 'other'}
                onChange={() => setPurpose('other')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-base">{t.callbackRequest.purposeOther}</span>
            </InteractiveDiv>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}> {/* Wrapped CallToActionButton */}
          <CallToActionButton
            type="submit"
            icon={Send}
            disabled={isSubmitting}
            size="md"
            className="mt-6"
            interactionEffect="pixels"
            gaEvent={{ category: 'Callback_Request', action: 'Click_SubmitCallbackRequest' }}
            ymEvent={{ category: 'Callback_Request', action: 'Click_SubmitCallbackRequest' }}
          >
            {t.callbackRequest.submitButton}
          </CallToActionButton>
        </motion.div>
      </motion.form>
    </ModalWrapper>
  );
};

export default CallbackRequestModal;
