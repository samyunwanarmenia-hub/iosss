"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { TranslationKeys, ProductShowcaseItem } from '@/types/global';
import { productShowcaseData } from '@/data/productShowcaseData';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';
import { trackGoogleAdsConversion } from '@/utils/analytics';

interface UseOrderFormProps {
  t: TranslationKeys;
  currentLang: string;
  initialSelectedProductKey?: ProductShowcaseItem['labelKey'];
  onClose: () => void;
}

interface UseOrderFormReturn {
  address: string;
  setAddress: (address: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  selectedProducts: ProductShowcaseItem['labelKey'][];
  handleProductSelect: (productKey: ProductShowcaseItem['labelKey']) => void;
  totalPrice: number;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useOrderForm = ({ t, currentLang, initialSelectedProductKey, onClose }: UseOrderFormProps): UseOrderFormReturn => {
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<ProductShowcaseItem['labelKey'][]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialSelectedProductKey) {
      setSelectedProducts([initialSelectedProductKey]);
    } else {
      setSelectedProducts([]);
    }
  }, [initialSelectedProductKey]);

  const validatePhone = useCallback((phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    return phoneRegex.test(phoneNumber);
  }, []);

  const handleProductSelect = useCallback((productKey: ProductShowcaseItem['labelKey']) => {
    setSelectedProducts((prev: ProductShowcaseItem['labelKey'][]) => {
      if (prev.includes(productKey)) {
        // If already selected, deselect it
        return [];
      } else {
        // If not selected, make it the only selected product
        return [productKey];
      }
    });
  }, []);

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum: number, key: ProductShowcaseItem['labelKey']) => {
      const product = productShowcaseData.find(p => p.labelKey === key);
      return sum + (product ? product.price : 0);
    }, 0);
  }, [selectedProducts]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!address.trim() || !phone.trim()) {
      showError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(phone)) {
      showError(t.orderModal.invalidPhone);
      setIsSubmitting(false);
      return;
    }

    if (selectedProducts.length === 0) {
      showError(t.orderModal.selectProducts);
      setIsSubmitting(false);
      return;
    }

    const selectedProductNames = selectedProducts.map((key: ProductShowcaseItem['labelKey']) => t.productShowcase[key]).join(' & ');
    const telegramMessage = `<b>New Order!</b>\n\n<b>Products:</b> ${selectedProductNames}\n<b>Total Price:</b> ${totalPrice} AMD\n<b>Address:</b> ${address}\n<b>Phone:</b> ${phone}\n\n<b>Language:</b> ${currentLang ? currentLang.toUpperCase() : 'N/A'}`;
    
    try {
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.orderModal.orderSuccess1);
      
      setTimeout(() => {
        showSuccess(t.orderModal.orderSuccess2);
      }, 3000);

      setAddress('');
      setPhone('');
      setSelectedProducts([]);
      onClose();

      // Google Ads conversion for successful order submission
      const sanitizedPhone = phone.replace(/[^\d]/g, '');
      const transactionId = `order_${Date.now()}_${sanitizedPhone.slice(-4)}`;
      trackGoogleAdsConversion({ value: totalPrice, currency: 'AMD', transactionId });
    } catch (error: unknown) {
      console.error("Error submitting order:", error);
      showError(error instanceof Error ? error.message : "Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [address, phone, selectedProducts, totalPrice, currentLang, t, validatePhone, onClose]);

  return {
    address,
    setAddress,
    phone,
    setPhone,
    selectedProducts,
    handleProductSelect,
    totalPrice,
    isSubmitting,
    handleSubmit,
  };
};
