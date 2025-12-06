import { Phone, MessageCircle, Facebook } from 'lucide-react';
import { TranslationKeys, ContactModalType } from '../types/global';
import CallToActionButton from './CallToActionButton';
import ModalWrapper from './ModalWrapper'; // Import ModalWrapper
import { motion } from 'framer-motion'; // Import motion

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContactModalType;
  t: TranslationKeys;
}

const ContactModal = ({ isOpen, onClose, type, t }: ContactModalProps) => {
  const isCallType = type === 'call';

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

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={isCallType ? t.contactModal.chooseCall : t.contactModal.chooseMessage}
      maxWidth="max-w-sm"
    >
      <motion.div 
        className="flex flex-col space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isCallType ? (
          <>
            <motion.div variants={itemVariants}>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number1.replace(/\s/g, '')}`}
                icon={Phone}
                variant="primary" // Using primary variant
                size="md"
                gaEvent={{ category: 'Contact', action: 'Click_CallModal_Phone1', label: t.contactModal.callNumbers.number1 }}
                ymEvent={{ category: 'Contact', action: 'Click_CallModal_Phone1', label: t.contactModal.callNumbers.number1 }}
              >
                {t.contactModal.callNumbers.number1}
              </CallToActionButton>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CallToActionButton
                href={`tel:${t.contactModal.callNumbers.number2.replace(/\s/g, '')}`}
                icon={Phone}
                variant="primary" // Using primary variant
                size="md"
                gaEvent={{ category: 'Contact', action: 'Click_CallModal_Phone2', label: t.contactModal.callNumbers.number2 }}
                ymEvent={{ category: 'Contact', action: 'Click_CallModal_Phone2', label: t.contactModal.callNumbers.number2 }}
              >
                {t.contactModal.callNumbers.number2}
              </CallToActionButton>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={itemVariants}>
              <CallToActionButton
                href="https://wa.me/37496653666"
                target="_blank"
                rel="noopener noreferrer"
                icon={MessageCircle}
                variant="primary" // Using primary variant
                size="md"
                gaEvent={{ category: 'Contact', action: 'Click_MessageModal_WhatsApp' }}
                ymEvent={{ category: 'Contact', action: 'Click_MessageModal_WhatsApp' }}
              >
                {t.contactModal.whatsapp}
              </CallToActionButton>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CallToActionButton
                href="https://m.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                icon={Facebook}
                variant="primary" // Using primary variant
                size="md"
                gaEvent={{ category: 'Contact', action: 'Click_MessageModal_FacebookMessenger' }}
                ymEvent={{ category: 'Contact', action: 'Click_MessageModal_FacebookMessenger' }}
              >
                {t.contactModal.facebookMessenger}
              </CallToActionButton>
            </motion.div>
          </>
        )}
      </motion.div>
    </ModalWrapper>
  );
};

export default ContactModal;