'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ProductVisual({ product, priority = false, className = '' }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 26 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 26 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3.5, 3.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      className={`group relative overflow-hidden bg-ink ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_22%,rgba(215,188,133,0.24),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.26),transparent_38%),linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]" />
      <motion.div className="absolute inset-0" style={{ rotateX, rotateY }}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.025]"
        />
      </motion.div>
      <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_24%,rgba(255,255,255,0.12)_48%,transparent_70%)] transition-transform duration-[1600ms] ease-luxury group-hover:translate-x-[120%]" />
    </motion.div>
  );
}
