import OptimizedImage from '@/components/OptimizedImage';
import { AuthenticityInfoModalProps } from '@/types/global';
import ModalWrapper from './ModalWrapper';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { ShieldCheck } from 'lucide-react';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import { QR_VERIFICATION_URL, QR_VERIFICATION_REL } from '@/config/siteConfig';
import { useEffect, useState } from 'react';

const AuthenticityInfoModal: React.FC<AuthenticityInfoModalProps> = ({ isOpen, onClose, t }) => {
  const [canRenderQr, setCanRenderQr] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCanRenderQr(true);
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const qrCodeValue = QR_VERIFICATION_URL;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.authenticity.title}
      maxWidth="max-w-xl" // Adjusted max-width for a single column
    >
      <motion.div 
        className="flex flex-col items-center text-center gap-6 mt-5 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-4 sm:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Certificate Image */}
        <InteractiveDiv 
          className="flex flex-col items-center text-center w-full" // Ensure it takes full width
          variants={itemVariants}
          whileHoverScale={1.03}
          hoverY={0}
          hoverShadow="none"
        >
          <div
            className="w-full h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-3 overflow-hidden bg-white dark:bg-gray-800"
          >
            <OptimizedImage 
              src="/images/samyun-arm-original-whey-certificate.jpg"
              alt="Samyun Wan оригинальный сертификат подлинности с защитными элементами QR код верификация Armenia" 
              className="w-full h-auto object-cover"
              loading="eager"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4">
            {t.authenticity.certificateDesc}
          </p>
        </InteractiveDiv>

        {/* QR Code Block */}
        <InteractiveDiv
          className="p-4 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs sm:max-w-sm lg:max-w-md mx-auto text-center"
          variants={itemVariants} // Apply itemVariants for animation
          hoverY={-5}
          hoverShadow="0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)"
        >
          <div className="flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
              {t.hero.qrBlockTitle}
            </h3>
          </div>
          <a 
            href={QR_VERIFICATION_URL}
            rel={QR_VERIFICATION_REL}
            target="_blank"
            className="group block p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={t.hero.qrBlockTitle}
      >
        <motion.div
          className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-105 transition-all border border-gray-200 dark:border-gray-600 p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {canRenderQr ? (
            <QRCodeCanvas value={qrCodeValue} size={128} level="H" />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded" aria-hidden />
          )}
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
          {t.hero.qrBlockDescription}
        </p>
      </a>
        </InteractiveDiv>
      </motion.div>
    </ModalWrapper>
  );
};

export default AuthenticityInfoModal;
