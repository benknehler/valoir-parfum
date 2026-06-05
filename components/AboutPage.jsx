'use client';

import Image from 'next/image';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { products } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';
import { motion } from 'framer-motion';

const values = [
  ['Elegance', 'A precise visual and olfactive language shaped around restraint.'],
  ['Sensuality', 'Warmth, texture and proximity designed to stay close to skin.'],
  ['Exclusivity', 'A focused collection with a private, memorable scent identity.'],
  ['Modern Craft', 'Classical materials reinterpreted through contemporary clarity.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="lux-container grid min-h-dvh items-center gap-12 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Maison Valoir</p>
          <h1 className="section-title mt-6">Composed for the intimate unforgettable.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            Valoir is a fragrance house for modern presence: elegant, sensual and quietly
            commanding. The collection lives between dark fruit, polished amber, velvet florals and
            warm woods.
          </p>
        </motion.div>
        <motion.div variants={revealSlow} initial="hidden" animate="visible" className="relative mx-auto h-[420px] w-full max-w-[520px] overflow-hidden bg-white/[0.035] sm:h-[580px]">
          <Image src="/images/valoir-logo.jpg" alt="Valoir Parfum emblem" fill className="object-cover opacity-90" priority />
        </motion.div>
      </section>

      <section className="section-space border-y border-white/10 bg-white/[0.025]">
        <div className="lux-container grid gap-12 lg:grid-cols-2">
          <MotionSection slow>
            <ProductVisual product={products[0]} className="min-h-[680px]" />
          </MotionSection>
          <MotionSection className="flex items-end" slow>
            <div>
              <p className="eyebrow">Story</p>
              <h2 className="mt-6 font-serif text-6xl leading-none text-porcelain md:text-8xl">
                Quiet power, made wearable.
              </h2>
              <p className="body-lux mt-8">
                The Valoir wardrobe is built as a series of atmospheres. Each composition moves
                slowly, unfolding from a precise opening into a textured heart and a long, polished
                base.
              </p>
              <p className="body-lux mt-6">
                It is luxury without excess: cinematic, close, memorable.
              </p>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <MotionSection className="mb-14 max-w-4xl" slow>
          <p className="eyebrow">Values</p>
          <h2 className="section-title mt-6">A house of restraint and depth.</h2>
        </MotionSection>
        <div className="grid gap-px bg-white/10 md:grid-cols-4">
          {values.map(([title, text]) => (
            <MotionSection key={title} className="min-h-[300px] bg-ink p-8" slow>
              <h3 className="font-serif text-4xl leading-none text-porcelain">{title}</h3>
              <p className="mt-8 leading-7 text-cream/60">{text}</p>
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  );
}
