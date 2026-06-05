'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import NewsletterForm from './NewsletterForm.jsx';
import ServiceStrip from './ServiceStrip.jsx';
import { formatPrice, products } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

const [noir, luna] = products;

function AtmospherePanel({ product, align = 'left' }) {
  const isSolar = product.world === 'solar';

  return (
    <MotionSection
      className={`relative min-h-[92vh] overflow-hidden ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_72%_18%,rgba(255,192,83,0.28),transparent_24rem),linear-gradient(135deg,#080503_0%,#5a2708_48%,#0a0603_100%)]'
          : 'bg-[radial-gradient(circle_at_28%_18%,rgba(142,14,29,0.34),transparent_24rem),linear-gradient(135deg,#040303_0%,#31070d_48%,#050403_100%)]'
      }`}
      slow
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_34%,rgba(255,255,255,0.035)_61%,transparent)] opacity-70" />
      <div className="absolute inset-x-[8%] bottom-[9%] h-[22vh] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.2),transparent_62%)] blur-xl" />
      <div className={`lux-container relative grid min-h-[92vh] items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] ${align === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">{product.collection}</p>
          <h2 className="mt-7 font-serif text-[clamp(4.7rem,9vw,11rem)] leading-[0.76] text-porcelain">
            {product.name}
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-9 text-cream/70 md:text-2xl md:leading-10">
            {product.campaign}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {product.accords.map((accord) => (
              <span key={accord} className="text-[0.72rem] font-semibold uppercase tracking-luxury text-cream/60">
                {accord}
              </span>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link className="button-lux button-lux-primary" href={`/product/${product.slug}`}>
              View Details
            </Link>
            <Link className="button-lux" href="/shop">
              Discover Collection
            </Link>
          </div>
        </div>
        <div className="relative min-h-[56vh] lg:min-h-[82vh]">
          <ProductVisual
            product={product}
            className="absolute inset-0 bg-transparent"
            imageClassName={isSolar ? 'drop-shadow-[0_42px_90px_rgba(255,154,49,0.18)]' : 'drop-shadow-[0_42px_90px_rgba(142,14,29,0.22)]'}
          />
        </div>
      </div>
    </MotionSection>
  );
}

function AccordLine({ product }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {product.accords.map((accord, index) => (
        <motion.div
          key={accord}
          className="relative min-h-36 overflow-hidden py-7"
          initial={{ opacity: 0, y: 30, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.95, delay: index * 0.05, ease: luxuryEase }}
        >
          <div className="hairline" />
          <span className="mt-7 block text-[0.64rem] font-semibold uppercase tracking-luxury text-champagne/50">
            0{index + 1}
          </span>
          <strong className="mt-4 block font-serif text-4xl font-normal leading-none text-porcelain">
            {accord}
          </strong>
        </motion.div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 110]);
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 0.22], [0, -28]);

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden bg-[#030202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(142,14,29,0.26),transparent_31rem),radial-gradient(circle_at_76%_30%,rgba(194,106,27,0.2),transparent_29rem),linear-gradient(180deg,#020101_0%,#080403_54%,#030202_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.07)_43%,transparent_53%),linear-gradient(245deg,transparent_14%,rgba(255,255,255,0.04)_46%,transparent_64%)] opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-[32vh] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.18),transparent_58%),linear-gradient(180deg,transparent,rgba(0,0,0,0.94))]" />
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <ProductVisual product={noir} priority className="h-full bg-transparent" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.36)_45%,rgba(0,0,0,0.78)_100%)]" />

        <div className="lux-container relative z-10 flex min-h-dvh items-end pb-[11vh] pt-28">
          <motion.div className="max-w-5xl" style={{ y: copyY }} variants={revealSlow} initial="hidden" animate="visible">
            <p className="eyebrow">Valoir Parfum</p>
            <h1 className="mt-8 font-serif text-[clamp(5.4rem,15vw,15rem)] font-semibold leading-[0.72] text-porcelain">
              VALOIR
            </h1>
            <p className="mt-8 max-w-2xl text-2xl leading-9 text-cream/75 md:text-4xl md:leading-[1.15]">
              Dark cherry. Golden heat. A signature that stays.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Link className="button-lux button-lux-primary" href="/shop">
                Discover the Collection
              </Link>
              <Link className="button-lux" href="#scent-dna">
                Explore the Scent DNA
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceStrip />

      <section id="collection" className="section-space lux-container">
        <MotionSection className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]" slow>
          <div>
            <h2 className="section-title">Two fragrances. Two atmospheres.</h2>
          </div>
          <div className="max-w-2xl lg:pt-6">
            <p className="body-lux">
              Valoir begins with contrast: one fragrance in lacquered shadow, one in amber light.
              Both are built to leave a trace before the room names it.
            </p>
          </div>
        </MotionSection>
      </section>

      <section className="grid">
        <AtmospherePanel product={noir} />
        <AtmospherePanel product={luna} align="right" />
      </section>

      <section id="scent-dna" className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(142,14,29,0.18),transparent_28rem),radial-gradient(circle_at_86%_62%,rgba(194,106,27,0.18),transparent_30rem)]" />
        <div className="lux-container relative">
          <MotionSection className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]" slow>
            <div>
              <h2 className="section-title">Built in shadow and light.</h2>
            </div>
            <div className="space-y-12">
              <div>
                <p className="max-w-2xl text-xl leading-9 text-cream/70">
                  Noir Cerice and Luna Solea share a Valoir structure: a vivid opening, a textured
                  heart, a base that stays warm after the first impression fades.
                </p>
              </div>
              <div>
                <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-luxury text-ruby/80">
                  Noir Cerice
                </p>
                <AccordLine product={noir} />
              </div>
              <div>
                <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-luxury text-amber/90">
                  Luna Solea
                </p>
                <AccordLine product={luna} />
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-space relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />
        <div className="lux-container relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionSection className="min-h-[70vh]" slow>
            <ProductVisual product={noir} className="h-full min-h-[620px] bg-transparent" />
          </MotionSection>
          <MotionSection className="flex items-center" slow>
            <div>
              <h2 className="font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.78] text-porcelain">
                The ritual of presence.
              </h2>
              <p className="body-lux mt-9 max-w-xl">
                A Valoir fragrance is not decoration. It is the last thing applied and the first
                thing remembered: fruit darkened by smoke, fruit warmed by sun, both composed with
                restraint.
              </p>
              <div className="mt-12 grid gap-7 sm:grid-cols-2">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group block py-6"
                  >
                    <div className="hairline" />
                    <span className="mt-6 block text-[0.68rem] font-semibold uppercase tracking-luxury text-cream/50">
                      {product.family.join(' / ')}
                    </span>
                    <strong className="mt-4 block font-serif text-4xl font-normal leading-none text-porcelain transition-colors duration-500 group-hover:text-champagne">
                      {product.name}
                    </strong>
                    <span className="mt-5 block text-sm text-champagne">{formatPrice(product.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section id="newsletter" className="section-space lux-container">
        <MotionSection className="mx-auto max-w-5xl" slow>
          <NewsletterForm />
        </MotionSection>
      </section>
    </>
  );
}
