"use client";

import { motion } from 'framer-motion';

interface PixelDotsProps {
  className?: string;
}

const PixelDots: React.FC<PixelDotsProps> = ({ className }) => {
  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center opacity-20 ${className}`}
    >
      <div
        className="grid grid-cols-4 grid-rows-4 gap-1 w-10 h-10 transform scale-50" // Adjusted gap and overall size, applied scale via transform
      >
        {Array.from({ length: 16 }).map((_, i) => (
          // Changed bg-white to theme-aware
          // Changed bg-gray-50 to bg-gray-300 for light mode
          <div key={i} className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-sm" />
        ))}
      </div>
    </motion.div>
  );
};

export default PixelDots;