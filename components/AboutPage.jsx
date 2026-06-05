'use client';

import Image from 'next/image';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { products } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';
import { motion } from 'framer-motion';
import { assetPath } from '../lib/assets.js';

const values = [
  ['Restraint', 'Nothing loud. Nothing accidental. Every note has a reason to stay.'],
  ['Texture', 'Cherry, smoke, fruit, cream and amber shaped as materials, not decoration.'],
  ['Presence', 'Fragrance made to arrive quietly and remain after the room changes.'],
  ['Contrast', 'Dark lacquer beside solar heat. A house built between the two.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="lux-container grid min-h-dvh items-center gap-12 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Maison Valoir</p>
          <h1 className="section-title mt-6">A house built between shadow and heat.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            Valoir composes fragrance as atmosphere. Noir Cerice moves through lacquered cherry,
            rose and smoke. Luna Solea turns fruit, cream and amber into sun-warmed skin.
          </p>
        </motion.div>
        <motion.div variants={revealSlow} initial="hidden" animate="visible" className="relative mx-auto h-[420px] w-full max-w-[520px] overflow-hidden sm:h-[580px]">
          <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum emblem" fill className="object-cover opacity-90" priority />
        </motion.div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#050302]">
        <div className="lux-container grid gap-12 lg:grid-cols-2">
          <MotionSection slow>
            <ProductVisual product={products[0]} className="min-h-[680px]" />
          </MotionSection>
          <MotionSection className="flex items-end" slow>
            <div>
              <h2 className="mt-6 font-serif text-6xl leading-none text-porcelain md:text-8xl">
                The bottle is the beginning. The atmosphere does the rest.
              </h2>
              <p className="body-lux mt-8">
                Each Valoir fragrance is edited like a scene: light direction, temperature,
                texture, distance. The result is intimate, but never invisible.
              </p>
              <p className="body-lux mt-6">
                Luxury appears in the restraint: fewer signatures, sharper memories.
              </p>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <MotionSection className="mb-14 max-w-4xl" slow>
          <h2 className="section-title">What Valoir keeps.</h2>
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
