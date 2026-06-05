'use client';

import { motion } from 'framer-motion';
import ProductVisual from '../ProductVisual.jsx';
import { luxuryEase } from '../../lib/motion.js';

export default function DtcProductScene({
  product,
  priority = false,
  paired = false,
  className = '',
  imageClassName = '',
}) {
  const isSolar = product.world === 'solar';

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-[2.4rem] bg-pearl shadow-[0_28px_90px_rgba(68,46,24,0.11)] ${className}`}
      whileHover={{ scale: 1.006 }}
      transition={{ duration: 1.2, ease: luxuryEase }}
    >
      <div
        className={`absolute inset-0 ${
          isSolar
            ? 'bg-[radial-gradient(circle_at_58%_18%,rgba(214,189,134,0.46),transparent_24rem),linear-gradient(145deg,#fffdf8,#f1dfc2_56%,#fff8ee)]'
            : 'bg-[radial-gradient(circle_at_44%_18%,rgba(123,31,43,0.16),transparent_24rem),linear-gradient(145deg,#fffdf8,#efe2d5_56%,#fbf7ef)]'
        }`}
      />
      <div className="absolute inset-x-[12%] bottom-[9%] h-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.14),transparent_66%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(255,255,255,0.74),transparent_34%,rgba(255,255,255,0.48)_62%,transparent_82%)]" />
      {paired && (
        <div className="absolute inset-y-[12%] left-1/2 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      )}
      <ProductVisual
        product={product}
        priority={priority}
        className="absolute inset-[3%] rounded-[2rem] bg-transparent"
        imageClassName={`object-[50%_43%] ${imageClassName}`}
      />
    </motion.div>
  );
}
