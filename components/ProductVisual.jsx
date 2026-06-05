'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ProductVisual({ product, priority = false, className = '', fit = 'cover', imageClassName = '' }) {
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

  const isSolar = product.world === 'solar';
  const atmosphere = isSolar
    ? 'bg-[radial-gradient(circle_at_58%_18%,rgba(255,184,76,0.34),transparent_20rem),radial-gradient(circle_at_35%_66%,rgba(194,106,27,0.22),transparent_28rem),linear-gradient(145deg,#090604_0%,#43200a_48%,#0b0704_100%)]'
    : 'bg-[radial-gradient(circle_at_56%_20%,rgba(142,14,29,0.38),transparent_22rem),radial-gradient(circle_at_45%_80%,rgba(215,188,133,0.16),transparent_24rem),linear-gradient(145deg,#050303_0%,#210408_48%,#050403_100%)]';
  const light = isSolar
    ? 'bg-[radial-gradient(ellipse_at_center,rgba(255,217,151,0.3),transparent_35%),linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]'
    : 'bg-[radial-gradient(ellipse_at_center,rgba(143,14,29,0.28),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.86))]';
  const positionClass = /\b(absolute|relative|fixed|sticky)\b/.test(className) ? '' : 'relative';

  return (
    <motion.div
      className={`group ${positionClass} overflow-hidden bg-ink ${atmosphere} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 opacity-80 mix-blend-screen bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_52%),radial-gradient(circle_at_48%_18%,rgba(255,255,255,0.16),transparent_16rem)]" />
      <div className={`absolute inset-x-0 bottom-0 h-1/2 ${light}`} />
      <div className="absolute inset-x-[8%] bottom-[7%] h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.2),transparent_58%)] blur-xl" />
      <motion.div className="absolute inset-0" style={{ rotateX, rotateY }}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`${fit === 'contain' ? 'object-contain p-[6%]' : 'object-cover'} transition-transform duration-[1800ms] ease-luxury group-hover:scale-[1.025] ${imageClassName}`}
        />
      </motion.div>
      <div className={`absolute inset-0 ${isSolar ? 'bg-amber/20' : 'bg-ruby/20'} mix-blend-color`} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.32),transparent_18%,transparent_82%,rgba(5,4,3,0.32)),linear-gradient(180deg,rgba(5,4,3,0.22),transparent_24%,rgba(5,4,3,0.36))]" />
      <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_24%,rgba(255,255,255,0.13)_48%,transparent_70%)] transition-transform duration-[1900ms] ease-luxury group-hover:translate-x-[120%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_20%,rgba(0,0,0,0.22)_100%)]" />
    </motion.div>
  );
}
