"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AnimatedArrowProps {
  className?: string;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ className }) => {
  const arrowVariants = {
    animate: {
      x: [0, -5, 0], // Move left, then back
      opacity: [0, 1, 1, 0], // Fade in, stay, fade out
      transition: {
        x: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className={`absolute flex items-center ${className}`}
      variants={arrowVariants}
      initial={{ x: 0, opacity: 0 }}
      animate="animate"
    >
      <ArrowLeft className="w-8 h-8 text-primary-500 dark:text-primary-400" />
    </motion.div>
  );
};

export default AnimatedArrow;
