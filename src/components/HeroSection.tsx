"use client";

import { ShoppingCart, MessageCircle, Award, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatItem } from '../types/global';
import HeroStats from './HeroStats';
import CallToActionButton from './CallToActionButton';
import { productShowcaseData } from '../data/productShowcaseData';
import { useLayoutContext } from '@/context/LayoutContext';
import HeroQrCodeBlock from './HeroQrCodeBlock';

interface HeroSectionProps {
  stats: StatItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const { t, openOrderModal } = useLayoutContext();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  const mainProduct = productShowcaseData[0];
  const titleWords = t.hero.title.split(' ');
  const primaryLine = titleWords.slice(0, 2).join(' ');
  const secondaryLine = titleWords.slice(2).join(' ');

  return (
    <section id="home" className="relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(63,127,74,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(203,170,112,0.08),transparent_45%)]" />
      <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center rounded-full bg-[var(--muted-surface)] px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] ring-1 ring-[var(--border-soft)]"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Award className="mr-2 h-4 w-4 text-[var(--accent)]" />
            {t.hero.guarantee}
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
          >
            <h1 className="text-[38px] sm:text-[42px] font-extrabold leading-tight text-[var(--text-primary)]">
              <span className="block">{primaryLine}</span>
              {secondaryLine ? <span className="block text-[var(--accent)]">{secondaryLine}</span> : null}
            </h1>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              <Sprout className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              {t.hero.tagline}
            </p>
          </motion.div>

          <motion.p
            className="max-w-2xl text-[17px] leading-[1.6] text-[var(--text-secondary)]"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.14 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <CallToActionButton
              onClick={() => openOrderModal(mainProduct.labelKey)}
              icon={ShoppingCart}
              variant="primary"
              size="md"
              interactionEffect="burst"
              gaEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
              ymEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
              className="shadow-md"
            >
              {t.hero.cta}
            </CallToActionButton>
            <CallToActionButton
              href="https://m.me/samyunwanarmenia"
              target="_blank"
              rel="noopener noreferrer"
              icon={MessageCircle}
              variant="secondary"
              size="md"
              gaEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
              ymEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
            >
              {t.hero.consultation}
            </CallToActionButton>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.26 }}
            className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-4 shadow-sm"
          >
            <HeroStats t={t} stats={stats} startDelay={0} />
          </motion.div>
        </div>

        <motion.div
          className="grid gap-4 sm:gap-6"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
        >
          <HeroQrCodeBlock delay={0.1} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
