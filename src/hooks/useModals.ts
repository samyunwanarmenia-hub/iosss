"use client";

import { useState, useCallback } from 'react';
import { ContactModalType, ProductShowcaseItem, TranslationKeys } from '@/types/global';

interface UseModalsProps {
  currentLang: string;
  t: TranslationKeys;
}

interface UseModalsReturn {
  contactModalOpen: boolean;
  contactModalType: ContactModalType;
  orderModalOpen: boolean;
  initialSelectedProduct: ProductShowcaseItem['labelKey'] | undefined;
  authenticityModalOpen: boolean;
  callbackRequestModalOpen: boolean;
  openContactModal: (type: ContactModalType) => void;
  closeContactModal: () => void;
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void;
  closeOrderModal: () => void;
  openAuthenticityModal: () => void;
  closeAuthenticityModal: () => void;
  openCallbackRequestModal: () => void;
  closeCallbackRequestModal: () => void;
}

export const useModals = ({ currentLang: _currentLang, t: _t }: UseModalsProps): UseModalsReturn => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [contactModalType, setContactModalType] = useState<ContactModalType>('call');
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [initialSelectedProduct, setInitialSelectedProduct] = useState<ProductShowcaseItem['labelKey'] | undefined>(undefined);
  const [authenticityModalOpen, setAuthenticityModalOpen] = useState<boolean>(false);
  const [callbackRequestModalOpen, setCallbackRequestModalOpen] = useState<boolean>(false);

  const openContactModal = useCallback((type: ContactModalType) => {
    setContactModalType(type);
    setContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
  }, []);

  const openOrderModal = useCallback((productKey?: ProductShowcaseItem['labelKey']) => {
    setInitialSelectedProduct(productKey);
    setOrderModalOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => {
    setOrderModalOpen(false);
    setInitialSelectedProduct(undefined);
  }, []);

  const openAuthenticityModal = useCallback(() => {
    setAuthenticityModalOpen(true);
  }, []);

  const closeAuthenticityModal = useCallback(() => {
    setAuthenticityModalOpen(false);
  }, []);

  const openCallbackRequestModal = useCallback(() => {
    setCallbackRequestModalOpen(true);
  }, []);

  const closeCallbackRequestModal = useCallback(() => {
    setCallbackRequestModalOpen(false);
  }, []);

  return {
    contactModalOpen,
    contactModalType,
    orderModalOpen,
    initialSelectedProduct,
    authenticityModalOpen,
    callbackRequestModalOpen,
    openContactModal,
    closeContactModal,
    openOrderModal,
    closeOrderModal,
    openAuthenticityModal,
    closeAuthenticityModal,
    openCallbackRequestModal,
    closeCallbackRequestModal,
  };
};