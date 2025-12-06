"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  onClose?: () => void; // New optional prop
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // New state to track if component is mounted on client

  useEffect(() => {
    setMounted(true); // Set to true once component mounts on client
  }, []);

  const handleToggle = () => {
    toggleTheme();
    onClose?.(); // Call onClose if provided
  };

  if (!mounted) {
    // Render a placeholder div on the server and until mounted on client.
    // This ensures the server and initial client render match, preventing hydration errors.
    return <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700" />; 
  }

  const toggleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.3, // Slight delay for entrance, after LanguageSwitcher
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      } 
    }
  };

  return (
    <motion.button
      onClick={handleToggle} // Use the new handler
      className="p-2 rounded-full bg-[var(--muted-surface)] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      variants={toggleVariants}
      initial="hidden"
      animate="visible"
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
