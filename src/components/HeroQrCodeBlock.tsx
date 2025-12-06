"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { useLayoutContext } from '@/context/LayoutContext';
import { ShieldCheck } from 'lucide-react';
import { QR_VERIFICATION_URL, QR_VERIFICATION_REL } from '@/config/siteConfig';

interface HeroQrCodeBlockProps {
  delay?: number;
}

const HeroQrCodeBlock: React.FC<HeroQrCodeBlockProps> = ({ delay = 0 }) => {
  const { t } = useLayoutContext();
  const [canRenderQr, setCanRenderQr] = useState(false);

  useEffect(() => {
    setCanRenderQr(true);
  }, []);

  const blockVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  return (
    <motion.div
      className="w-full max-w-lg rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 shadow-md"
      variants={blockVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{t.hero.qrBlockTitle}</h3>
        </div>
        <span className="rounded-full bg-[var(--muted-surface)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
          QR
        </span>
      </div>

      <a
        href={QR_VERIFICATION_URL}
        rel={QR_VERIFICATION_REL}
        target="_blank"
        className="group mt-5 block rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 text-center transition-all duration-300 hover:-translate-y-[2px] hover:border-[var(--accent)] hover:shadow-md"
        aria-label={t.hero.qrBlockTitle}
      >
        <motion.div
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-2 shadow-sm transition-transform group-hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {canRenderQr ? (
            <QRCodeCanvas value={QR_VERIFICATION_URL} size={128} level="H" />
          ) : (
            <div className="h-full w-full rounded bg-[var(--muted-surface)]" aria-hidden />
          )}
        </motion.div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {t.hero.qrBlockDescription}
        </p>
      </a>
    </motion.div>
  );
};

export default HeroQrCodeBlock;
