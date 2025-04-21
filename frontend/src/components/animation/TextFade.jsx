import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TextFade({ direction, children, className = '', staggerChildren = 0.2 }) {
  const FADE_DOWN = {
    show: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: direction === 'down' ? -30 : 30 },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.8, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child) ? <motion.div variants={FADE_DOWN}>{child}</motion.div> : child
      )}
    </motion.div>
  );
}
