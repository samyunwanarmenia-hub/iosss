"use client";

import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  notice?: string;
  type: 'privacy' | 'terms';
  versionLabel?: string;
  versionValue?: string;
  effectiveDateLabel?: string;
  effectiveDateValue?: string;
}

const LegalPageLayout = ({
  title,
  description,
  notice,
  type,
  versionLabel,
  versionValue,
  effectiveDateLabel,
  effectiveDateValue,
}: LegalPageLayoutProps) => {
  const Icon = type === 'privacy' ? Shield : FileText;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-[60vh] flex items-center justify-center py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl w-full">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          {/* Icon Header */}
          <motion.div
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
              <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {(versionValue || effectiveDateValue) && (
            <motion.div
              className="mb-6 flex flex-col items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
              variants={itemVariants}
            >
              {versionValue ? (
                <span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {versionLabel ?? 'Version'}:
                  </span>{' '}
                  {versionValue}
                </span>
              ) : null}
              {effectiveDateValue ? (
                <span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {effectiveDateLabel ?? 'Effective date'}:
                  </span>{' '}
                  {effectiveDateValue}
                </span>
              ) : null}
            </motion.div>
          )}

          {/* Notice */}
          {notice && (
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg"
              variants={itemVariants}
            >
              <p className="text-blue-800 dark:text-blue-300 text-center font-medium">
                {notice}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LegalPageLayout;

