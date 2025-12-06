"use client";

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import CallToActionButton from '@/components/CallToActionButton';
import SectionHeader from './SectionHeader';
import { QRCodeCanvas } from 'qrcode.react';
import { useLayoutContext } from '@/context/LayoutContext';
import { useInView } from 'react-intersection-observer';
import { QR_VERIFICATION_URL, QR_VERIFICATION_REL } from '@/config/siteConfig';

const AuthenticityInfo = () => {
  const { t, openAuthenticityModal } = useLayoutContext();

  const { ref, inView: _inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const qrCodeValue = QR_VERIFICATION_URL;

  const hasAttentionText = !!t.authenticity.attention;
  const hasHowToDistinguishText = !!t.authenticity.howToDistinguish;
  const hasPurchaseWarning = !!t.authenticity.purchaseWarning;
  const hasDisclaimer = !!t.authenticity.disclaimer;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      id="authenticity"
      className="relative py-12 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.authenticity.title}
        />
        <motion.div
          className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          {hasAttentionText && (
            <motion.span
              className="inline-flex items-center bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xl font-bold px-4 py-2 rounded-full mb-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Award className="w-5 h-5 mr-2" /> {t.authenticity.attention}
            </motion.span>
          )}

          {/* Use external QR verification link */}
          <a 
            href={QR_VERIFICATION_URL}
            rel={QR_VERIFICATION_REL}
            target="_blank"
            className="group mb-3 flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 w-full cursor-pointer"
            aria-label={t.hero.qrVerificationTitle}
          >
            <motion.div
              className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center transform group-hover:scale-105 transition-all border border-gray-200 dark:border-gray-600 p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <QRCodeCanvas value={qrCodeValue} size={128} level="H" />
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-base">{t.hero.qrVerificationTitle}</p> {/* Changed text-gray-700 to text-gray-600 for light mode */}
            {t.hero.qrVerificationSubtitle && <p className="text-xs text-gray-400 dark:text-gray-400">{t.hero.qrVerificationSubtitle}</p>} {/* text-gray-400 is fine */}
          </a>

          {hasHowToDistinguishText && (
            <CallToActionButton
              onClick={openAuthenticityModal}
              variant="subtle"
              size="sm"
              className="mt-3 mx-auto"
            >
              {t.authenticity.howToDistinguish}
            </CallToActionButton>
          )}

          {hasPurchaseWarning && (
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-sm mt-6 mb-3 leading-relaxed" /* Changed text-gray-700 to text-gray-600 for light mode */
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              {t.authenticity.purchaseWarning}
            </motion.p>
          )}

          {hasDisclaimer && (
            <motion.p
              className="text-red-600 dark:text-red-400 text-xs font-semibold mt-4 leading-relaxed"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              {t.authenticity.disclaimer}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AuthenticityInfo;
