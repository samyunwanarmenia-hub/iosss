"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutContext } from '@/context/LayoutContext';
import { translations } from '@/i18n/translations';
import { TranslationKeys } from '@/types/global';
import { useModals } from '@/hooks/useModals';
import useActiveLink from '@/hooks/useActiveLink';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import MainLayout from '@/layouts/MainLayout';
// import IntroAnimation from './IntroAnimation'; // Удаляем статический импорт
import { ThemeProvider } from '@/context/ThemeContext';
import ToastProvider from '@/components/ToastProvider';
import dynamic from 'next/dynamic';
import { DEFAULT_LANG, isSupportedLang } from '@/config/locales';

// Dynamically import client-only components with ssr: false
const DynamicYandexMetrikaTracker = dynamic(() => import('@/components/YandexMetrikaTracker'), { ssr: false });
const DynamicVisitTrackerWrapper = dynamic(() => import('@/components/VisitTrackerWrapper'), { ssr: false });
const DynamicGoogleAnalyticsTracker = dynamic(() => import('@/components/GoogleAnalyticsTracker'), { ssr: false });
const DynamicServiceWorkerRegister = dynamic(() => import('@/components/ServiceWorkerRegister'), { ssr: false });

const getLangFromPathname = (path?: string | null) => {
  const segments = (path || '').split('/').filter(Boolean);
  const candidate = segments[0]?.toLowerCase();
  return isSupportedLang(candidate) ? candidate : null;
};

interface LayoutClientProviderProps {
  children: React.ReactNode;
  initialLang: string;
}

const LayoutClientProvider: React.FC<LayoutClientProviderProps> = ({ children, initialLang }) => {
  const pathname = usePathname();
  const router = useRouter();
  const pathLang = useMemo(() => getLangFromPathname(pathname), [pathname]);

  const [currentLangState, setCurrentLangState] = useState<string>(pathLang || initialLang || DEFAULT_LANG);
  const [loadingLinkModalOpen, setLoadingLinkModalOpen] = useState(false);
  const [loadingLinkClientId, setLoadingLinkClientId] = useState<string | null>(null);

  // Determine if it's the QR verification page
  const isQrVerifyPage = useMemo(() => {
    const pathSegments = (pathname ?? '').split('/').filter(Boolean);
    return pathSegments.length >= 2 && pathSegments[1] === 'verify' && pathSegments[2] === 'qr';
  }, [pathname]);

  useEffect(() => {
    if (pathLang && pathLang !== currentLangState) {
      setCurrentLangState(pathLang);
      return;
    }

    if (initialLang && isSupportedLang(initialLang) && !pathLang && initialLang !== currentLangState) {
      setCurrentLangState(initialLang);
    }
  }, [currentLangState, initialLang, pathLang]);

  // Effect to update the HTML lang attribute and body classes
  useEffect(() => {
    document.documentElement.lang = currentLangState;

    if (isQrVerifyPage) {
      document.body.classList.add('body-blank');
      document.documentElement.classList.remove('dark'); // Ensure light mode for blank page
      document.body.style.overflow = ''; // Ensure scrolling is enabled for QR page
    } else {
      document.body.classList.remove('body-blank');
      // ThemeContext will handle 'dark' class for other pages
      document.body.style.overflow = '';
    }

    return () => {
      // Clean up when component unmounts or isQrVerifyPage changes
      document.body.classList.remove('body-blank');
      document.body.style.overflow = ''; // Always reset overflow on cleanup
    };
  }, [currentLangState, isQrVerifyPage]);

  const t: TranslationKeys = useMemo(() => {
    const selectedTranslations = translations[currentLangState];
    // Removed: console.log(`LayoutClientProvider - Memoized 't' object for lang '${currentLangState}':`, selectedTranslations);
    return selectedTranslations;
  }, [currentLangState]);

  const {
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
  } = useModals({ currentLang: currentLangState, t });

  const openLoadingLinkModal = () => {
    setLoadingLinkModalOpen(true);
    setLoadingLinkClientId(crypto.randomUUID());
  };

  const closeLoadingLinkModal = () => {
    setLoadingLinkModalOpen(false);
    setLoadingLinkClientId(null);
  };

  const { getLinkClasses } = useActiveLink();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLangState);

  const setCurrentLang = (newLang: string) => {
    setCurrentLangState(newLang);
    const currentPath = pathname || '/';
    const pathSegments = currentPath.split('/').filter(Boolean);
    let newPathname = `/${newLang}`;
    if (pathSegments.length > 1) {
      newPathname += `/${pathSegments.slice(1).join('/')}`;
    }
    router.push(newPathname);
  };

  const contextValue = {
    t,
    currentLang: currentLangState,
    setCurrentLang,
    openContactModal,
    openOrderModal,
    openAuthenticityModal,
    openCallbackRequestModal,
    openLoadingLinkModal,
    getLinkClasses,
    getHomePath,
    getSectionPath,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <ThemeProvider>
        <ToastProvider />
        <DynamicYandexMetrikaTracker />
        <DynamicGoogleAnalyticsTracker />
        <DynamicVisitTrackerWrapper />
        <DynamicServiceWorkerRegister />
        <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-50 relative">
          {isQrVerifyPage ? (
            children
          ) : (
            <MainLayout
              contactModalOpen={contactModalOpen}
              contactModalType={contactModalType}
              orderModalOpen={orderModalOpen}
              initialSelectedProduct={initialSelectedProduct}
              authenticityModalOpen={authenticityModalOpen}
              callbackRequestModalOpen={callbackRequestModalOpen}
              closeContactModal={closeContactModal}
              closeOrderModal={closeOrderModal}
              closeAuthenticityModal={closeAuthenticityModal}
              closeCallbackRequestModal={closeCallbackRequestModal}
              loadingLinkModalOpen={loadingLinkModalOpen}
              closeLoadingLinkModal={closeLoadingLinkModal}
              loadingLinkClientId={loadingLinkClientId}
              t={t}
              currentLang={currentLangState}
            >
              {children}
            </MainLayout>
          )}
        </div>
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutClientProvider;
