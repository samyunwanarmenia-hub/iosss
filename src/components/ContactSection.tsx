"use client";

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import type { TranslationKeys } from '@/types/global';

interface ContactSectionProps {
  translations?: TranslationKeys;
}

const ContactSection = ({ translations }: ContactSectionProps) => {
  const { t: contextTranslations, openContactModal } = useLayoutContext();
  const t = translations ?? contextTranslations;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="contact" 
      className="relative py-12 text-gray-800 dark:text-gray-50 overflow-hidden" /* Changed text-gray-900 to text-gray-800 for light mode */
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title={t.contact.title}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12 mx-auto max-w-6xl">
          {contactInfoData.map((item, index) => (
            <InteractiveDiv 
              key={item.key} 
              className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.1 + 0.2 }}
              hoverY={-5} // Subtle lift
              hoverShadow="0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05), var(--tw-shadow-glow-green)" // Enhanced shadow with glow
            >
              <motion.div
                className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-gray-900 dark:text-gray-50 text-lg font-bold">{t.contact[item.titleKey]}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-base" dangerouslySetInnerHTML={{ __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details }} />
            </InteractiveDiv>
          ))}
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: contactInfoData.length * 0.1 + 0.4 }}
        >
          <CallToActionButton 
            onClick={() => openContactModal('call')} 
            icon={Phone}
            variant="primary"
            size="sm"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton 
            onClick={() => openContactModal('message')} 
            icon={MessageCircle}
            variant="primary"
            size="sm"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-center text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t.hero.facebookFollow}
          </p>
          <div className="w-full max-w-[500px]">
            <iframe
              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsamyunwanarmenia%2Fposts%2Fpfbid02kG1Bz8B3ywzAe5XTfGRFmRtiReAcAPUnq4nw1sCUHg86NaTqAsMaKi2zaTeLb2ubl&show_text=true&width=500"
              width="500"
              height="507"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Samyun Wan Armenia Facebook post"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
