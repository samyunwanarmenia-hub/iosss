"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Import intro animation specific CSS files here
import '@/styles/intro-animation.css';
import '@/styles/intro-animations/animation01.css';
import '@/styles/intro-animations/animation02.css';
import '@/styles/intro-animations/animation03.css';
import '@/styles/intro-animations/animation04.css';

const IntroAnimation: React.FC = () => {
  return (
    <motion.div
      className="intro-animation-container new-complex" // New class to distinguish this animation
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }} // Keep the same exit animation duration
    >
      <div className="animation01">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="animation02">
        <div />
        <div />
      </div>
      <div className="animation03">
        <div className="circle">
          <div className="circle_element01" />
        </div>
        <div className="circle">
          <div className="circle_element02" />
        </div>
        <div className="circle">
          <div className="circle_element03" />
        </div>
          <div className="animation04">
            <div className="line_wrapper line_wrapper01">
              <span className="line line01" />
            </div>
            <div className="rotate45">
              <div className="line_wrapper line_wrapper02">
                <span className="line line02" />
              </div>
            </div>
            <div className="line_wrapper line_wrapper03">
              <span className="line line03" />
            </div>
            <div className="rotate135">
              <div className="line_wrapper line_wrapper04">
                <span className="line line04" />
              </div>
            </div>
            <div className="line_wrapper line_wrapper05">
              <span className="line line05" />
            </div>
            <div className="rotate-135">
              <div className="line_wrapper line_wrapper06">
                <span className="line line06" />
              </div>
            </div>
            <div className="line_wrapper line_wrapper07">
              <span className="line line07" />
            </div>
            <div className="rotate-45">
              <div className="line_wrapper line_wrapper08">
                <span className="line line08" />
              </div>
            </div>
          </div>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
