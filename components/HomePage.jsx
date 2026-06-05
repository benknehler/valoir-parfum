'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import NewsletterForm from './NewsletterForm.jsx';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import { products } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

const [noir, luna] = products;

function ProductDuo({ compact = false }) {
  return (
    <div className={`relative mx-auto w-full ${compact ? 'h-[620px]' : 'h-[620px] lg:h-[760px]'}`}>
      <div className="absolute inset-x-[8%] bottom-[8%] h-[22%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(96,67,38,0.16),transparent_66%)] blur-2xl" />
      <motion.div
        className="absolute left-0 top-[16%] h-[60%] w-[52%] max-w-[540px] rotate-[-3deg] sm:left-[4%]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: luxuryEase }}
      >
        <ProductVisual product={noir} priority={!compact} className="h-full shadow-luxury" imageClassName="object-[51%_45%]" />
      </motion.div>
      <motion.div
        className="absolute right-0 top-[7%] h-[64%] w-[52%] max-w-[570px] rotate-[2deg] sm:right-[3%]"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: luxuryEase }}
      >
        <ProductVisual product={luna} priority={!compact} className="h-full shadow-glow" imageClassName="object-[50%_44%]" />
      </motion.div>
      <div className="absolute bottom-[8%] left-1/2 h-px w-[74%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}

function AccordList({ product }) {
  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-2">
      {product.accords.map((accord) => (
        <span key={accord} className="border-t border-gold/20 pt-4 text-[0.68rem] font-semibold uppercase tracking-luxury text-charcoal/50">
          {accord}
        </span>
      ))}
    </div>
  );
}

function FragranceWorld({ product, reverse = false }) {
  const isSolar = product.world === 'solar';

  return (
    <section
      className={`relative overflow-hidden py-24 sm:py-32 lg:py-40 ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_78%_12%,rgba(214,189,134,0.38),transparent_28rem),linear-gradient(135deg,#fffdf8_0%,#f5e5cf_50%,#fff8ee_100%)]'
          : 'bg-[radial-gradient(circle_at_24%_12%,rgba(123,31,43,0.15),transparent_26rem),linear-gradient(135deg,#fffdf8_0%,#eee1d2_52%,#fbf7ef_100%)]'
      }`}
    >
      <div className="lux-container grid items-center gap-14 lg:grid-cols-2">
        <MotionSection className={`relative h-[620px] ${reverse ? 'lg:order-2' : ''}`} slow>
          <motion.div
            className="absolute inset-x-[4%] inset-y-0"
            whileInView={{ y: [34, 0], scale: [1.018, 1] }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.45, ease: luxuryEase }}
          >
            <ProductVisual product={product} className="h-full" imageClassName="object-[50%_43%]" />
          </motion.div>
        </MotionSection>

        <MotionSection className="max-w-2xl" slow>
          <p className="eyebrow">{product.collection}</p>
          <h2 className="mt-7 font-serif text-[clamp(4rem,8vw,8.8rem)] font-semibold leading-[0.82] text-charcoal">
            {isSolar ? 'Wärme, weich gezeichnet.' : 'Tiefe, klar poliert.'}
          </h2>
          <p className="mt-8 max-w-xl text-2xl leading-10 text-charcoal/70">{product.campaign}</p>
          <AccordList product={product} />
          <Link className="button-lux button-lux-primary mt-11" href={`/product/${product.slug}`}>
            {product.name} entdecken
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -54]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 82]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <>
      <section ref={heroRef} className="relative min-h-dvh overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(214,189,134,0.38),transparent_30rem),radial-gradient(circle_at_16%_26%,rgba(123,31,43,0.11),transparent_28rem),linear-gradient(180deg,#fffdf8_0%,#fbf7ef_58%,#f1e6d5_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.68),transparent_68%)]" />

        <div className="lux-container relative grid min-h-[calc(100dvh-6rem)] items-center gap-10 py-10 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div className="relative z-10 max-w-3xl" style={{ y: copyY }} variants={revealSlow} initial="hidden" animate="visible">
            <h1 className="editorial-title">VALOIR</h1>
            <p className="mt-8 max-w-2xl text-2xl leading-9 text-charcoal/70 md:text-4xl md:leading-[1.14]">
              Zwei Duftwelten. Eine unverwechselbare Präsenz.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Link className="button-lux button-lux-primary" href="/shop">
                Kollektion entdecken
              </Link>
              <Link className="button-lux" href="#duftwelten">
                Duftwelten erleben
              </Link>
            </div>
          </motion.div>

          <motion.div className="relative z-0" style={{ y: visualY, scale: visualScale }}>
            <ProductDuo />
          </motion.div>
        </div>
      </section>

      <section id="duftwelten" className="relative overflow-hidden section-space">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbf7ef_0%,#fffdf8_48%,#f6eddf_100%)]" />
        <div className="lux-container relative">
          <MotionSection className="mx-auto max-w-5xl text-center" slow>
            <p className="eyebrow">Valoir Parfum</p>
            <h2 className="section-title mt-6">Zwei Düfte. Ein Statement.</h2>
            <p className="body-lux mx-auto mt-8 max-w-2xl">
              Noir Cerice und Luna Solea stehen einander gegenüber: dunkle Kirsche und goldene Wärme,
              reduziert auf Form, Licht und Präsenz.
            </p>
          </MotionSection>

          <MotionSection className="relative mt-20 overflow-hidden rounded-[2.6rem] bg-pearl/60 px-4 py-10 shadow-luxury sm:px-10 lg:px-16" slow>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(123,31,43,0.13),transparent_24rem),radial-gradient(circle_at_72%_18%,rgba(214,189,134,0.38),transparent_28rem)]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr_0.72fr]">
              <div className="order-2 lg:order-1">
                <p className="eyebrow">Noir Cerice</p>
                <div className="mt-8 grid gap-4">
                  {noir.accords.map((accord) => (
                    <span key={accord} className="border-t border-cherry/20 pt-4 text-sm uppercase tracking-nav text-charcoal/60">
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                className="order-1 lg:order-2"
                whileInView={{ y: [48, 0], filter: ['blur(14px)', 'blur(0px)'] }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 1.4, ease: luxuryEase }}
              >
                <ProductDuo compact />
              </motion.div>
              <div className="order-3 text-left lg:text-right">
                <p className="eyebrow">Luna Solea</p>
                <div className="mt-8 grid gap-4">
                  {luna.accords.map((accord) => (
                    <span key={accord} className="border-t border-gold/25 pt-4 text-sm uppercase tracking-nav text-charcoal/60">
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <FragranceWorld product={noir} />
      <FragranceWorld product={luna} reverse />

      <section id="newsletter" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(214,189,134,0.34),transparent_28rem),radial-gradient(circle_at_82%_20%,rgba(123,31,43,0.1),transparent_30rem)]" />
        <MotionSection className="relative mx-auto max-w-5xl" slow>
          <NewsletterForm />
        </MotionSection>
      </section>
    </>
  );
}
