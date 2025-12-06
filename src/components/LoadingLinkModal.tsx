"use client";

import { motion } from 'framer-motion';
import { TranslationKeys } from '../types/global';
import LoadingSpinner from './LoadingSpinner';
import { X, Copy } from 'lucide-react';
import { showSuccess, showError } from '../utils/toast';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv

interface LoadingLinkModalProps {
  isOpen: boolean;
  t: TranslationKeys;
  clientId: string | null;
  onClose: () => void;
}

const LoadingLinkModal = ({ isOpen, t, clientId, onClose }: LoadingLinkModalProps) => {
  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
    visible: { y: "0", opacity: 1, scale: 1, transition: { delay: 0.1, type: "spring", stiffness: 200, damping: 20 } },
    exit: { y: "100vh", opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const handleCopyClientId = async () => {
    if (clientId) {
      try {
        await navigator.clipboard.writeText(clientId);
        showSuccess("Client ID copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy Client ID:", err);
        showError("Failed to copy Client ID.");
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[100] flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl relative w-full max-w-sm flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <InteractiveDiv 
          as="button"
          onClick={onClose} 
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-700 transition-colors"
          aria-label="Close modal"
          whileHoverScale={1.1}
          whileTapScale={0.9}
          hoverY={0}
          hoverShadow="none"
        >
          <X className="w-5 h-5" />
        </InteractiveDiv>
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-24 h-24 mb-6 flex items-center justify-center" variants={itemVariants}>
            <LoadingSpinner />
          </motion.div>
          <motion.h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4" variants={itemVariants}>
            {t.loadingLinkModal.title}
          </motion.h3>
          <motion.p className="text-gray-700 dark:text-gray-300 text-lg mb-2" variants={itemVariants}>
            {t.loadingLinkModal.message}
          </motion.p>
          <motion.p className="text-gray-500 dark:text-gray-400 text-sm mb-4" variants={itemVariants}>
            {t.loadingLinkModal.waitingForAdmin}
          </motion.p>

          {clientId && (
            <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Your Client ID:</p>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-600">
                <code className="text-gray-800 dark:text-gray-200 text-sm mr-2">{clientId}</code>
                <InteractiveDiv
                  as="button"
                  onClick={handleCopyClientId}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 transition-colors" 
                  whileHoverScale={1.1}
                  whileTapScale={0.9}
                  hoverY={0}
                  hoverShadow="none"
                >
                  <Copy className="w-4 h-4" />
                </InteractiveDiv>
              </div>
            </motion.div>
          )}

          <InteractiveDiv
            as="button"
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-50 font-bold py-3 px-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105 transition-all mt-4"
            whileHoverScale={1.08}
            whileTapScale={0.95}
            hoverY={0}
            hoverShadow="none"
            variants={itemVariants}
          >
            Close
          </InteractiveDiv>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingLinkModal;