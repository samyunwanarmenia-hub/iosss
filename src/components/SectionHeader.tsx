"use client";

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <motion.div 
      className={`text-center mb-12 ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Use whileInView for section headers
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 
        className={`text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-50 mb-5 ${titleClassName || ''}`} /* Changed text-gray-900 to text-gray-800 for light mode */
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${subtitleClassName || ''}`} /* Changed text-gray-700 to text-gray-600 for light mode */
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;