"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExplosionEffect from './ExplosionEffect';
import PixelExplosion from './PixelExplosion';
import { Icon, AnalyticsEvent } from '../types/global';
import { trackGAEvent, trackGoogleAdsConversion } from '@/utils/analytics';

interface CallToActionButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: Icon;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  interactionEffect?: 'burst' | 'pixels';
  gaEvent?: AnalyticsEvent;
  ymEvent?: AnalyticsEvent;
}

const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  icon: IconComponent,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  iconClassName,
  type = 'button',
  interactionEffect,
  gaEvent,
  ymEvent,
}) => {
  const [activeEffect, setActiveEffect] = useState<'burst' | 'pixels' | null>(null);
  const [effectCoords, setEffectCoords] = useState({ x: 0, y: 0 });

  const handleInteraction = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (interactionEffect && !disabled) {
      setActiveEffect(interactionEffect);
      setEffectCoords({ x: e.clientX, y: e.clientY });
    }
    
    if (gaEvent) {
      const label = gaEvent.label || (typeof children === 'string' ? children : undefined);
      trackGAEvent({
        ...gaEvent,
        label,
      });
      // Ads conversion for key CTA actions
      trackGoogleAdsConversion({
        label: gaEvent.action,
      });
    }

    if (ymEvent && typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', ymEvent.action, {
        category: ymEvent.category,
        label: ymEvent.label || (typeof children === 'string' ? children : undefined),
        value: ymEvent.value,
      });
    }

    onClick?.(e);
  };

  const handleEffectComplete = () => {
    setActiveEffect(null);
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-transform duration-200 rounded-lg relative overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-primary)]";
  
  const sizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  const variantClasses: Record<NonNullable<CallToActionButtonProps['variant']>, string> = {
    primary:
      "bg-[var(--brand-primary)] text-white border border-[var(--accent-strong)] hover:bg-[var(--accent-strong)] hover:shadow-md",
    secondary:
      "bg-white text-[var(--brand-primary)] border border-[var(--brand-primary)] hover:bg-[var(--surface-muted)] hover:shadow-md",
    outline:
      "border border-[var(--brand-primary-strong)] text-[var(--brand-primary-strong)] bg-transparent hover:bg-[var(--brand-primary)] hover:text-white",
    ghost:
      "border border-slate-300 text-slate-800 bg-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] dark:border-slate-600 dark:text-slate-100 dark:hover:border-[var(--brand-primary)]",
    subtle:
      "bg-[var(--surface-muted)] text-[var(--text-primary)] border border-[var(--border-soft)] hover:bg-white hover:shadow-sm",
  };

  const iconSizeClasses: Record<NonNullable<CallToActionButtonProps['size']>, string> = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.08 },
    whileTap: disabled ? {} : { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {disabled ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {IconComponent && <IconComponent className={`${iconSizeClasses[size]} mr-2 ${iconClassName || ''} relative z-10`} />}
          <span className="relative z-10">{children}</span>
        </>
      )}
      <AnimatePresence>
        {activeEffect === 'burst' && <ExplosionEffect x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
        {activeEffect === 'pixels' && <PixelExplosion x={effectCoords.x} y={effectCoords.y} onComplete={handleEffectComplete} />}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={handleInteraction}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleInteraction}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default CallToActionButton;
