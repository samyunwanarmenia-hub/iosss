"use client";

import { motion } from 'framer-motion'; // Removed AnimatePresence

interface PixelExplosionProps {
  onComplete: () => void;
  x: number;
  y: number;
}

const colors = ['#ff2d74', '#25d4ff', '#39ff14', '#bd00ff']; // Neon colors

const PixelExplosion: React.FC<PixelExplosionProps> = ({ onComplete, x, y }) => {
  const pixelVariants = {
    initial: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    animate: (i: number) => ({
      x: Math.cos(i * (Math.PI * 2 / 20)) * (50 + Math.random() * 50), // Spread pixels in a circle
      y: Math.sin(i * (Math.PI * 2 / 20)) * (50 + Math.random() * 50),
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.8 + Math.random() * 0.5,
        ease: "easeOut",
        delay: Math.random() * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-[1000]"
      style={{ top: y, left: x }}
      onAnimationComplete={onComplete}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            top: '-4px', // Center around the click point
            left: '-4px', // Center around the click point
          }}
          variants={pixelVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </motion.div>
  );
};

export default PixelExplosion;