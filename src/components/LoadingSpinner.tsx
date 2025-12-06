"use client";

import { motion } from 'framer-motion';

const spinnerVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: 0 }, // Initial state for pop-in
  animate: {
    opacity: 1,
    scale: 1, // Scale to normal size
    rotate: 360,
    transition: {
      opacity: { duration: 0.3, ease: "easeOut" },
      scale: { duration: 0.5, ease: "easeOut" },
      rotate: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  },
};

const shadowPulseVariants = {
  animate: {
    boxShadow: [
      "0 0 0px var(--primary-500-rgb-04)", // primary-500 with 40% opacity
      "0 0 15px var(--primary-500-rgb-07)", // primary-500 with 70% opacity
      "0 0 0px var(--primary-500-rgb-04)",
    ],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500 rounded-full shadow-md" // Added shadow-md
      variants={spinnerVariants}
      initial="initial" // Use initial state
      animate="animate" // Animate to visible and then loop rotation
    >
      <motion.div
        className="w-full h-full rounded-full" // Inner div for shadow animation
        variants={shadowPulseVariants}
        animate="animate"
      />
    </motion.div>
  );
};

export default LoadingSpinner;