"use client";

import { motion } from 'framer-motion'; // Removed AnimatePresence

interface ExplosionEffectProps {
  onComplete: () => void; // Callback to notify parent when animation is done
  x: number; // Added x coordinate
  y: number; // Added y coordinate
}

const ExplosionEffect: React.FC<ExplosionEffectProps> = ({ onComplete, x, y }) => {
  const burstVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: {
      scale: [0, 1.5], // Scale from 0 to 1.5 times its size
      opacity: [1, 0.8, 0], // Fade out
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.7, 1], // Control opacity at different stages
      },
    },
  };

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ top: y, left: x, transform: 'translate(-50%, -50%)' }} // Position the explosion at the click coordinates
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-full rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(134, 180, 134, 0.6), transparent)' }} // Primary-500 green
        variants={burstVariants}
        initial="initial"
        animate="animate"
        exit="initial" // Use initial for exit to reset state
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-full rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(108, 144, 108, 0.6), transparent)' }} // Primary-600 green
        variants={burstVariants}
        initial="initial"
        animate="animate"
        exit="initial" // Use initial for exit to reset state
        transition={{ ...burstVariants.animate.transition, delay: 0.05 }} // Slightly delay the second burst
      />
    </motion.div>
  );
};

export default ExplosionEffect;