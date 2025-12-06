import { useState } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { translations } from '../i18n/translations';
import { DEFAULT_LANG } from '../config/locales';
import { statsData } from '../data/stats';
import HeroSection from '../components/HeroSection';
import ProductShowcaseSection from '../components/ProductShowcaseSection';
import { useModals } from '../hooks/useModals';
import { LayoutContextType } from '../types/global';

// Упрощенный провайдер для Vite версии
function ViteLayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState(DEFAULT_LANG);
  const t = translations[currentLang] || translations[DEFAULT_LANG];
  
  const modals = useModals({ currentLang, t });
  
  const contextValue: LayoutContextType = {
    t,
    currentLang,
    setCurrentLang,
    openContactModal: modals.openContactModal,
    openOrderModal: modals.openOrderModal,
    openAuthenticityModal: modals.openAuthenticityModal,
    openCallbackRequestModal: modals.openCallbackRequestModal,
    openLoadingLinkModal: () => {},
    getLinkClasses: () => '',
    getHomePath: () => '/',
    getSectionPath: () => '/',
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

function Home() {
  return (
    <ViteLayoutProvider>
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <HeroSection stats={statsData} />
        <ProductShowcaseSection />
      </main>
    </ViteLayoutProvider>
  );
}

export default Home;
