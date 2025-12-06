"use client"; // This is a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavbarProps } from '@/types/global';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { useLayoutContext } from '@/context/LayoutContext';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { navigationSections } from '@/data/navigationSections';

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navSurfaceClass = scrolled
    ? 'bg-[var(--surface)] shadow-sm border-b border-[var(--border-soft)]'
    : 'bg-[var(--background)] shadow-sm border-b border-[var(--border-soft)]';

  const primarySections = navigationSections.slice(0, 6);
  const contactSection = navigationSections.find(section => section.id === 'contact');
  const trackOrderSection = navigationSections.find(section => section.id === 'track-order');

  return (
    <header className={`sticky inset-x-0 top-0 z-[120] transition-all duration-150 ${navSurfaceClass}`} role="banner">
      <div className="container flex items-center justify-between gap-6 py-3">
        <Link href={getHomePath()} className="flex items-center min-w-0" aria-label={t.hero.title}>
          <span className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            {t.hero.title}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Primary">
          {primarySections.map(section => (
            <Link
              key={section.id}
              href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
              className={`text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-strong)] transition-all duration-300 ${getLinkClasses?.(section.id) ?? ''}`}
            >
              {t.nav[section.labelKey]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {trackOrderSection && (
            <Link
              href={getSectionPath(trackOrderSection.id)}
              className="hidden md:inline-flex items-center rounded-md border border-[var(--border-soft)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-[2px]"
            >
              {t.nav[trackOrderSection.labelKey]}
            </Link>
          )}
          {contactSection && (
            <Link
              href={getSectionPath(contactSection.id)}
              className="hidden sm:inline-flex items-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[var(--accent-strong)] hover:-translate-y-[2px]"
            >
              {t.nav[contactSection.labelKey]}
            </Link>
          )}
          <LanguageSwitcher />
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
