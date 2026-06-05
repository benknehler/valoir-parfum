'use client';

import { motion } from 'framer-motion';
import { reveal, revealSlow } from '../lib/motion.js';

export default function MotionSection({ children, className = '', slow = false }) {
  return (
    <motion.section
      className={className}
      variants={slow ? revealSlow : reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.section>
  );
}
