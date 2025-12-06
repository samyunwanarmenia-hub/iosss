"use client"; // This is a client component

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLayoutContext } from '@/context/LayoutContext';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { MobileNavProps, TranslationKeys } from '@/types/global';
import { navigationSections } from '@/data/navigationSections';
import { usePathname } from 'next/navigation';

const MobileNav: React.FC<MobileNavProps> = ({ scrolled: _scrolled }) => {
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);
  const pathname = usePathname();
  const previousOverflow = useRef<string | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const safeAreaMenuStyle = {
    paddingTop: 'calc(env(safe-area-inset-top) + 12px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
  };

  // Variants for the hamburger lines
  const line1Variants = {
    closed: { y: 0, rotate: 0 },
    open: { y: 8, rotate: 45 },
  };

  const line2Variants = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  };

  const line3Variants = {
    closed: { y: 0, rotate: 0 },
    open: { y: -8, rotate: -45 },
  };

  // Variants for the mobile menu itself
  const menuVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  // Close the menu automatically on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  // Prevent background scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }

    return () => {
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        type="button"
        className="relative inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] z-[130]"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line1Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line2Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-6 rounded-full bg-current"
          variants={line3Variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="mobile-nav-overlay"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[115]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav-drawer"
              className="fixed top-0 left-0 h-screen w-[90vw] max-w-[420px] sm:max-w-[460px] bg-[var(--background)] border-r border-[var(--border-soft)] shadow-2xl z-[120]"
              style={safeAreaMenuStyle}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between px-6">
                  <Link
                    href={getHomePath()}
                    onClick={closeMenu}
                    className="text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)] max-w-[220px] whitespace-normal"
                  >
                    {t.hero.title}
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                    aria-label={t.nav.close}
                    type="button"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col items-start gap-5 px-6 py-8 overflow-y-auto" aria-label="Mobile">
                  {navigationSections.map(section => (
                    <motion.div key={section.id} variants={menuItemVariants} className="w-full">
                      <Link
                        href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                        onClick={closeMenu}
                        className={`${getLinkClasses(section.id)} block rounded-lg border border-transparent px-3 py-2 text-base font-medium tracking-tight text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface)] transition-all duration-300 dark:hover:bg-[var(--muted-surface)]`}
                      >
                        {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    className="flex items-center gap-3 pt-3 border-t border-[var(--border-soft)] w-full"
                  >
                    <LanguageSwitcher />
                    <ThemeToggle onClose={closeMenu} />
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
