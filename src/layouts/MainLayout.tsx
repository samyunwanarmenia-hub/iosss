"use client"; // This is a client component

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useLayoutContext } from '@/context/LayoutContext'; // Import useLayoutContext
import { ContactModalType, ProductShowcaseItem, TranslationKeys } from '@/types/global'; // Import necessary types, including TranslationKeys
import FloatingActionButton from '@/components/FloatingActionButton'; // Import the new FAB component

interface MainLayoutProps {
  children: React.ReactNode;
  // Props for modals, now passed from LayoutClientProvider
  contactModalOpen: boolean;
  contactModalType: ContactModalType;
  orderModalOpen: boolean;
  initialSelectedProduct: ProductShowcaseItem['labelKey'] | undefined;
  authenticityModalOpen: boolean;
  callbackRequestModalOpen: boolean;
  closeContactModal: () => void;
  closeOrderModal: () => void;
  closeAuthenticityModal: () => void;
  closeCallbackRequestModal: () => void;
  loadingLinkModalOpen: boolean;
  closeLoadingLinkModal: () => void;
  loadingLinkClientId: string | null;
  t: TranslationKeys; // Added t prop
  currentLang: string; // Added currentLang prop
}

// Dynamically import client-only components with ssr: false
const DynamicNavbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/Footer'), { ssr: false });
// Removed DynamicSvgGradientBackground import
const DynamicScrollToTopButton = dynamic(() => import('@/components/ScrollToTopButton'), { ssr: false }); // Lazy load ScrollToTopButton

// Dynamically import modals with ssr: false
const DynamicContactModal = dynamic(() => import('@/components/ContactModal'), { ssr: false });
const DynamicOrderModal = dynamic(() => import('@/components/OrderModal'), { ssr: false });
const DynamicAuthenticityInfoModal = dynamic(() => import('@/components/AuthenticityInfoModal'), { ssr: false });
const DynamicCallbackRequestModal = dynamic(() => import('@/components/CallbackRequestModal'), { ssr: false });
const DynamicLoadingLinkModal = dynamic(() => import('@/components/LoadingLinkModal'), { ssr: false });


const MainLayout = ({
  children,
  contactModalOpen,
  contactModalType,
  orderModalOpen,
  initialSelectedProduct,
  authenticityModalOpen,
  callbackRequestModalOpen,
  closeContactModal,
  closeOrderModal,
  closeAuthenticityModal,
  closeCallbackRequestModal,
  loadingLinkModalOpen,
  closeLoadingLinkModal,
  loadingLinkClientId,
  t, // Destructure t from props
  currentLang, // Destructure currentLang from props
}: MainLayoutProps) => {
  const {
    openContactModal, // This is used in FloatingActionButton
    openCallbackRequestModal, // This is used in FloatingActionButton
    // openOrderModal, // Not used directly in MainLayout, handled by child components via their own context or props
    // openAuthenticityModal, // Not used directly in MainLayout, handled by child components via their own context or props
    // openLoadingLinkModal, // Not used directly in MainLayout, handled by LayoutClientProvider
  } = useLayoutContext(); // Consume context here

  return (
    <> {/* Use React.Fragment instead of a div */}
      <DynamicNavbar />
      
      <motion.main 
        className="flex-grow pt-16 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>

      <DynamicFooter /> {/* Use lazy-loaded component */}

      <FloatingActionButton 
        openContactModal={openContactModal} 
        openCallbackRequestModal={openCallbackRequestModal}
      />
      <DynamicScrollToTopButton /> {/* Use lazy-loaded component */}
      
      <AnimatePresence>
        {contactModalOpen && (
          <DynamicContactModal isOpen={contactModalOpen} onClose={closeContactModal} type={contactModalType} t={t} />
        )}
        {orderModalOpen && (
          <DynamicOrderModal isOpen={orderModalOpen} onClose={closeOrderModal} t={t} currentLang={currentLang} initialSelectedProductKey={initialSelectedProduct} />
        )}
        {authenticityModalOpen && (
          <DynamicAuthenticityInfoModal
            isOpen={authenticityModalOpen}
            onClose={closeAuthenticityModal}
            t={t}
          />
        )}
        {callbackRequestModalOpen && (
          <DynamicCallbackRequestModal
            isOpen={callbackRequestModalOpen}
            onClose={closeCallbackRequestModal}
            t={t}
            currentLang={currentLang}
          />
        )}
        {loadingLinkModalOpen && (
          <DynamicLoadingLinkModal
            isOpen={loadingLinkModalOpen}
            onClose={closeLoadingLinkModal}
            t={t}
            clientId={loadingLinkClientId}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MainLayout;
