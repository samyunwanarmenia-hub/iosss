"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextAnimationProps {
  text: string;
  delay?: number;
  duration?: number; // New prop for animation duration
  className?: string;
}

const SplitTextAnimation: React.FC<SplitTextAnimationProps> = ({ text, delay = 0, duration = 0.8, className }) => {
  // Split the text into two parts: "Samyun Wan" and "Armenia"
  // Find the index of the second space
  const firstSpaceIndex = text.indexOf(' ');
  const secondSpaceIndex = text.indexOf(' ', firstSpaceIndex + 1);

  let part1 = text;
  let part2 = '';

  if (secondSpaceIndex !== -1) {
    part1 = text.substring(0, secondSpaceIndex);
    part2 = text.substring(secondSpaceIndex);
  } else if (firstSpaceIndex !== -1) { // Fallback if only one space
    part1 = text.substring(0, firstSpaceIndex);
    part2 = text.substring(firstSpaceIndex);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const textPartVariants = {
    hidden: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '-100%' : '100%', // Use 100% for full off-screen translation
      y: 20, // Add a slight vertical offset
      opacity: 0,
    }),
    visible: {
      x: '0%',
      y: 0, // Animate to 0 for vertical position
      opacity: 1,
      transition: {
        duration: duration, // Use the new duration prop
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`flex justify-center overflow-hidden ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="inline-block whitespace-nowrap"
        variants={textPartVariants}
        custom="left"
      >
        {part1}
      </motion.span>
      <motion.span
        className="inline-block whitespace-nowrap"
        variants={textPartVariants}
        custom="right"
      >
        {part2}
      </motion.span>
    </motion.div>
  );
};

export default SplitTextAnimation;