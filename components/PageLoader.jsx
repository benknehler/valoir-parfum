'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { luxuryEase } from '../lib/motion.js';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 920);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 0.7, ease: luxuryEase }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.86, ease: luxuryEase }}
            className="relative h-24 w-24"
          >
            <Image src="/images/valoir-logo.jpg" alt="Valoir Parfum" fill className="rounded-full object-cover" priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
