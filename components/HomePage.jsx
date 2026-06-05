'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import NewsletterForm from './NewsletterForm.jsx';
import ScentPyramid from './ScentPyramid.jsx';
import ServiceStrip from './ServiceStrip.jsx';
import { products } from '../lib/products.js';
import { luxuryEase, reveal, revealSlow } from '../lib/motion.js';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(194,106,27,0.2),transparent_34rem),radial-gradient(circle_at_28%_42%,rgba(142,14,29,0.24),transparent_30rem)]" />
        <motion.div className="absolute right-[-18vw] top-[11vh] h-[78vh] w-[82vw] max-w-[1120px] lg:right-[4vw]" style={{ y: heroY, scale: heroScale }}>
          <ProductVisual product={products[0]} priority className="h-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-[8vh] right-[8vw] hidden h-[48vh] w-[34vw] max-w-[520px] opacity-80 lg:block"
          initial={{ opacity: 0, x: 60, filter: 'blur(20px)' }}
          animate={{ opacity: 0.72, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.25, delay: 0.3, ease: luxuryEase }}
        >
          <ProductVisual product={products[1]} className="h-full" />
        </motion.div>
        <div className="absolute inset-0 z-[5] bg-[linear-gradient(90deg,rgba(5,4,3,0.95),rgba(5,4,3,0.72)_52%,rgba(5,4,3,0.18))] lg:bg-[linear-gradient(90deg,rgba(5,4,3,0.88),rgba(5,4,3,0.44)_44%,rgba(5,4,3,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 h-[36vh] bg-[linear-gradient(180deg,transparent,rgba(5,4,3,0.96))]" />

        <div className="lux-container relative z-10 flex min-h-dvh items-center pt-28">
          <motion.div className="max-w-5xl" variants={revealSlow} initial="hidden" animate="visible">
            <p className="eyebrow">Valoir Parfum</p>
            <h1 className="editorial-title mt-6">VALOIR</h1>
            <p className="mt-8 max-w-xl text-xl leading-9 text-cream/70 md:text-2xl">
              Fragrance composed for the unforgettable.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link className="button-lux button-lux-primary" href="/shop">
                Shop the Collection
              </Link>
              <Link className="button-lux" href="#dna">
                Discover the DNA
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceStrip />

      <section className="section-space lux-container">
        <MotionSection className="mb-16 max-w-4xl" slow>
          <p className="eyebrow">Signature Collection</p>
          <h2 className="section-title mt-6">Two signatures. One unmistakable presence.</h2>
        </MotionSection>

        <div className="grid gap-10">
          {products.map((product, index) => (
            <MotionSection
              key={product.id}
              className={`grid min-h-[720px] overflow-hidden lg:grid-cols-2 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              slow
            >
              <ProductVisual product={product} className="min-h-[460px] lg:min-h-full" />
              <div className="flex items-end border-y border-white/10 bg-white/[0.025] p-7 sm:p-12 lg:p-16">
                <div className="max-w-xl">
                  <p className="eyebrow">{product.collection}</p>
                  <h3 className="mt-6 font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[0.86] text-porcelain">
                    {product.name}
                  </h3>
                  <p className="body-lux mt-8">{product.short}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {product.family.map((tag) => (
                      <span key={tag} className="border border-white/10 px-3 py-2 text-xs uppercase tracking-nav text-cream/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link className="button-lux mt-10" href={`/product/${product.slug}`}>
                    Explore fragrance
                  </Link>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      <section id="dna" className="section-space relative overflow-hidden border-y border-white/10 bg-white/[0.025]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,188,133,0.12),transparent_38rem)]" />
        <div className="lux-container relative">
          <MotionSection className="mx-auto mb-16 max-w-4xl text-center" slow>
            <p className="eyebrow">Scent DNA</p>
            <h2 className="section-title mt-6">A pyramid built for memory.</h2>
            <p className="body-lux mx-auto mt-8 max-w-2xl">
              Valoir scents are composed as quiet architecture: luminous openings, textured hearts
              and a long, warm signature on skin.
            </p>
          </MotionSection>
          <MotionSection slow>
            <ScentPyramid product={products[0]} />
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <MotionSection className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]" slow>
          <div>
            <p className="eyebrow">Editorial Story</p>
            <h2 className="section-title mt-6">Crafted for presence. Designed for memory.</h2>
          </div>
          <p className="body-lux">
            Valoir creates fragrances with presence — composed to feel intimate, memorable and
            quietly commanding. Every formula is shaped around contrast: shadow and light, fruit
            and resin, texture and restraint.
          </p>
        </MotionSection>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 py-28">
        <div className="lux-container">
          <MotionSection className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]" slow>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow">Immersive Product Strip</p>
              <h2 className="mt-6 font-serif text-6xl leading-none text-porcelain md:text-8xl">
                A bottle held in the light.
              </h2>
              <p className="body-lux mt-8">
                Move through shadowed cherry, solar fruit and polished amber. The bottle remains
                the anchor; the atmosphere shifts around it.
              </p>
            </div>
            <div className="grid gap-8">
              {products.map((product) => (
                <article key={product.id} className="grid min-h-[560px] overflow-hidden bg-white/[0.025] lg:grid-cols-[0.9fr_1.1fr]">
                  <ProductVisual product={product} className="min-h-[360px]" />
                  <div className="flex items-center p-8 sm:p-12">
                    <div>
                      <p className="eyebrow">{product.mood}</p>
                      <h3 className="mt-6 font-serif text-6xl leading-none text-porcelain">{product.name}</h3>
                      <p className="body-lux mt-7">{product.story}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <section id="newsletter" className="section-space lux-container">
        <MotionSection className="relative mx-auto max-w-4xl" slow>
          <div className="absolute -inset-8 bg-[radial-gradient(circle_at_50%_0%,rgba(215,188,133,0.14),transparent_28rem)]" />
          <NewsletterForm />
        </MotionSection>
      </section>
    </>
  );
}
