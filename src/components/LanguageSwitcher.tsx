"use client";

import { useLayoutContext } from '@/context/LayoutContext';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { t, currentLang, setCurrentLang } = useLayoutContext();

  const languages = [
    { key: 'hy', label: '🇦🇲 Հայ', ariaLabel: t.nav.armenian },
    { key: 'ru', label: '🇷🇺 Рус', ariaLabel: t.nav.russian },
    { key: 'en', label: '🇺🇸 Eng', ariaLabel: t.nav.english },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2, // Slight delay for entrance
        staggerChildren: 0.05,
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex justify-center space-x-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {languages.map((lang) => (
        <motion.button
          key={lang.key}
          onClick={() => setCurrentLang(lang.key)}
          disabled={currentLang === lang.key}
          className="text-sm text-[var(--text-secondary)] disabled:opacity-60 disabled:font-semibold disabled:text-[var(--accent)] transition-colors duration-300 hover:text-[var(--accent-strong)]"
          aria-label={lang.ariaLabel}
          whileHover={{ scale: currentLang === lang.key ? 1 : 1.1 }}
          whileTap={{ scale: currentLang === lang.key ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          variants={itemVariants}
        >
          {lang.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitcher;
