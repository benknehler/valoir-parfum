'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ProductVisual({
  product,
  priority = false,
  className = '',
  imageClassName = '',
  elevated = true,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 28 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.4, 2.4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);
  const isSolar = product.world === 'solar';
  const hasPositionClass = /\b(absolute|relative|fixed|sticky)\b/.test(className);

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      className={`group ${hasPositionClass ? '' : 'relative'} overflow-hidden rounded-[2.2rem] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: 1400 }}
    >
      <div
        className={`absolute inset-0 ${
          isSolar
            ? 'bg-[radial-gradient(circle_at_58%_18%,rgba(255,221,166,0.76),transparent_26rem),linear-gradient(145deg,#fffaf0_0%,#f4dfc0_52%,#fffdf8_100%)]'
            : 'bg-[radial-gradient(circle_at_50%_20%,rgba(123,31,43,0.16),transparent_25rem),linear-gradient(145deg,#fffdf8_0%,#efe2d2_54%,#fff8ef_100%)]'
        }`}
      />
      <div className="absolute inset-x-[10%] bottom-[9%] h-[24%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.18),transparent_64%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.82),transparent_30%,rgba(255,255,255,0.44)_58%,transparent_76%)] opacity-70" />
      <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.92)_58%,transparent_86%)]"
        style={{ rotateX, rotateY }}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          preload={priority}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className={`object-cover object-center contrast-[0.96] saturate-[1.02] transition-transform duration-[1600ms] ease-luxury group-hover:scale-[1.018] ${imageClassName}`}
        />
      </motion.div>
      <div className={`absolute inset-0 ${isSolar ? 'bg-amber/10' : 'bg-cherry/10'} mix-blend-color`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.18),transparent_34%,rgba(251,247,239,0.34)),linear-gradient(90deg,rgba(251,247,239,0.46),transparent_22%,transparent_78%,rgba(251,247,239,0.46))]" />
      {elevated && (
        <div className="absolute inset-x-[18%] bottom-[7%] h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent" />
      )}
    </motion.div>
  );
}
