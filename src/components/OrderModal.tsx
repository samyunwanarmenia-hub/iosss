import { ShoppingCart } from 'lucide-react';
import { TranslationKeys, ProductShowcaseItem } from '../types/global';
import { productShowcaseData } from '../data/productShowcaseData';
import OptimizedImage from './OptimizedImage';
import CallToActionButton from './CallToActionButton';
import ModalWrapper from './ModalWrapper';
import { motion } from 'framer-motion';
import { useOrderForm } from '@/hooks/useOrderForm'; // Import the new hook
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv
import { translations } from '@/i18n/translations';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
  currentLang: string;
  initialSelectedProductKey?: ProductShowcaseItem['labelKey'];
}

const OrderModal = ({ isOpen, onClose, t, currentLang, initialSelectedProductKey }: OrderModalProps) => {
  const {
    address,
    setAddress,
    phone,
    setPhone,
    selectedProducts,
    handleProductSelect,
    totalPrice,
    isSubmitting,
    handleSubmit,
  } = useOrderForm({ t, currentLang, initialSelectedProductKey, onClose });

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
      title={t.orderModal.title}
      maxWidth="max-w-sm"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-base mb-3 text-center font-semibold" /* Changed text-gray-700 to text-gray-600 for light mode */
          variants={itemVariants}
        >
          {t.orderModal.selectProducts}
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-3 mb-5"
          variants={itemVariants}
        >
          {productShowcaseData.map((product) => {
            const isSelected = selectedProducts.includes(product.labelKey);
            const productAlt =
              (product.altKey && t.productShowcase[product.altKey]) ||
              (product.altKey && translations.en?.productShowcase?.[product.altKey as keyof typeof translations.en.productShowcase]) ||
              product.alt ||
              t.productShowcase.weightGainDesc;
            return (
              <InteractiveDiv
                key={product.labelKey}
                className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-4 border-primary-600 shadow-lg' // Changed to primary-600 for selected
                    : 'border-2 border-gray-300 dark:border-gray-600'
                }`}
                onClick={() => handleProductSelect(product.labelKey)}
                whileHoverScale={isSelected ? 1.08 : 1.05} // Further scale on hover if selected, or normal hover if not
                whileTapScale={0.95}
                hoverY={0}
                hoverShadow="none"
              >
                <OptimizedImage
                  src={product.src}
                  alt={productAlt}
                  className="w-16 h-16 object-contain rounded-lg"
                  loading="eager"
                  sizes="64px"
                />
                <p className="text-gray-800 dark:text-gray-50 mt-1.5 text-center font-medium"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
                  {t.productShowcase[product.labelKey]}
                </p>
              </InteractiveDiv>
            );
          })}
        </motion.div>

        {selectedProducts.length > 0 && (
          <motion.div 
            className="text-center mb-5 p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg border border-primary-200 dark:border-primary-700"
            variants={itemVariants}
          >
            <p className="text-gray-800 dark:text-gray-50 text-base font-bold mb-0.5"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
              Total: {totalPrice.toLocaleString()} AMD
            </p>
            <p className="text-primary-600 dark:text-primary-400 text-xs font-semibold">
              {t.orderModal.freeDeliveryMessage}
            </p>
          </motion.div>
        )}

        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-base mb-3 text-center" /* Changed text-gray-700 to text-gray-600 for light mode */
          variants={itemVariants}
        >
          {t.orderModal.deliveryInfo1}
        </motion.p>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-base mb-5 text-center" /* Changed text-gray-700 to text-gray-600 for light mode */
          variants={itemVariants}
        >
          {t.orderModal.deliveryInfo2}
        </motion.p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <motion.input
            type="text"
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-800 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600" /* Changed text-gray-900 to text-gray-800 for light mode */
            placeholder={t.orderModal.addressPlaceholder}
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
            whileFocus={{ scale: 1.01, borderColor: '#6c906c' }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            variants={itemVariants}
          />
          <motion.input
            type="tel"
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-gray-800 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600" /* Changed text-gray-900 to text-gray-800 for light mode */
            placeholder={t.orderModal.phonePlaceholder}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
            whileFocus={{ scale: 1.01, borderColor: '#6c906c' }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            variants={itemVariants}
          />
          <motion.div variants={itemVariants}> {/* Wrapped CallToActionButton */}
            <CallToActionButton
              type="submit"
              icon={ShoppingCart}
              disabled={isSubmitting}
              size="md"
              interactionEffect="pixels"
              gaEvent={{ category: 'Order', action: 'Click_OrderModal_Submit', label: selectedProducts.join('&') }}
              ymEvent={{ category: 'Order', action: 'Click_OrderModal_Submit', label: selectedProducts.join('&') }}
              className="mt-4"
            >
              {t.orderModal.orderButton}
            </CallToActionButton>
          </motion.div>
        </form>
      </motion.div>
    </ModalWrapper>
  );
};

export default OrderModal;
