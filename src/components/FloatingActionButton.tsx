"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, PhoneCall, Menu, X } from 'lucide-react';
import { ContactModalType } from '../types/global';
import { useLayoutContext } from '@/context/LayoutContext';
import { trackGAEvent, trackGoogleAdsConversion } from '@/utils/analytics';

interface FloatingActionButtonProps {
  openContactModal: (type: ContactModalType) => void;
  openCallbackRequestModal: () => void;
}

const FloatingActionButton = ({ openContactModal, openCallbackRequestModal }: FloatingActionButtonProps) => {
  const { t } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);

    // Analytics for opening/closing FAB menu
    trackGAEvent({
      action: isOpen ? 'Close_FAB_Menu' : 'Open_FAB_Menu',
      category: 'FAB_Interaction',
      label: isOpen ? 'Closed' : 'Opened',
    });
    trackGoogleAdsConversion({ label: isOpen ? 'Close_FAB_Menu' : 'Open_FAB_Menu' });
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', isOpen ? 'Close_FAB_Menu' : 'Open_FAB_Menu', {
        category: 'FAB_Interaction',
        label: isOpen ? 'Closed' : 'Opened',
      });
    }
  };

  const handleMenuItemClick = (action: () => void, gaEventLabel: string, ymEventLabel: string) => {
    action();
    setIsOpen(false); // Close menu after clicking an item

    // Analytics for menu item click
    trackGAEvent({
      action: 'Click_FAB_MenuItem',
      category: 'FAB_Interaction',
      label: gaEventLabel,
    });
    trackGoogleAdsConversion({ label: gaEventLabel });
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', 'Click_FAB_MenuItem', {
        category: 'FAB_Interaction',
        label: ymEventLabel,
      });
    }
  };

  const menuItemsData = [
    {
      label: t.contactModal.callUsButton,
      icon: Phone,
      action: () => openContactModal('call'),
      gaLabel: 'Call_FAB_Menu',
      ymLabel: 'Call_FAB_Menu',
      ariaLabel: t.contactModal.callUsButton,
      accent: '#f97316',
    },
    {
      label: t.contactModal.whatsapp,
      icon: MessageCircle,
      action: () => openContactModal('message'),
      gaLabel: 'WhatsApp_FAB_Menu',
      ymLabel: 'WhatsApp_FAB_Menu',
      ariaLabel: t.contactModal.whatsapp,
      accent: '#22c55e',
    },
    {
      label: t.contactModal.callbackButton,
      icon: PhoneCall,
      action: openCallbackRequestModal,
      gaLabel: 'Callback_FAB_Menu',
      ymLabel: 'Callback_FAB_Menu',
      ariaLabel: t.contactModal.callbackButton,
      accent: '#0ea5e9',
    },
  ];

  return (
    <div className="fab-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fab-menu"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {menuItemsData.map((item, index) => (
              <motion.button
                key={item.label}
                className="fab-menu-item"
                onClick={() => handleMenuItemClick(item.action, item.gaLabel, item.ymLabel)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                aria-label={item.ariaLabel}
              >
                <span className="fab-menu-icon" aria-hidden style={{ backgroundColor: item.accent }}>
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="fab-menu-text">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`fab ${isOpen ? 'open' : ''}`} // Add 'open' class when FAB is open
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="fab-wheel"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? 'x' : 'menu'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

    </div>
  );
};

export default FloatingActionButton;
