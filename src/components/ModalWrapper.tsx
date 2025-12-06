"use client";

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import { useEffect, useRef } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string; // For additional styling on the modal content div
  titleClassName?: string; // For additional styling on the title
  closeButtonClassName?: string; // For additional styling on the close button
  maxWidth?: string; // e.g., 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-2xl'
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  titleClassName,
  closeButtonClassName,
  maxWidth = 'max-w-sm', // Default max-width
}) => {
  const pushedStateRef = useRef(false);

  // Allow hardware back button to close the modal (useful on mobile)
  useEffect(() => {
    if (!isOpen) {
      pushedStateRef.current = false;
      return;
    }

    const stateData = { modal: true, title };
    window.history.pushState(stateData, '');
    pushedStateRef.current = true;

    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // If modal was opened and is closing via UI, remove the extra history entry
      if (pushedStateRef.current && window.history.state?.modal) {
        window.history.back();
      }
      pushedStateRef.current = false;
    };
  }, [isOpen, onClose, title]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
    visible: { y: "0", opacity: 1, scale: 1, transition: { delay: 0.1, type: "spring", stiffness: 200, damping: 20 } },
    exit: { y: "100vh", opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking on backdrop
        >
          <motion.div
            className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl relative w-full border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto ${maxWidth} ${className || ''}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <InteractiveDiv 
              as="button"
              onClick={onClose} 
              className={`absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-700 transition-colors ${closeButtonClassName || ''}`}
              aria-label="Close modal"
              whileHoverScale={1.1}
              whileTapScale={0.9}
              hoverY={0}
              hoverShadow="none"
            >
              <X className="w-5 h-5" />
            </InteractiveDiv>
            <h3 className={`text-xl font-bold text-gray-900 dark:text-gray-50 mb-5 text-center ${titleClassName || ''}`}>
              {title}
            </h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
