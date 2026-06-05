'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import NewsletterForm from './NewsletterForm.jsx';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import { products } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

const [noir, luna] = products;

function AccordRail({ product, tone = 'light' }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {product.accords.map((accord) => (
        <span
          key={accord}
          className={`border-t pt-4 text-[0.68rem] font-semibold uppercase tracking-luxury ${
            tone === 'gold' ? 'border-champagne/30 text-champagne/80' : 'border-white/15 text-cream/70'
          }`}
        >
          {accord}
        </span>
      ))}
    </div>
  );
}

function Atmosphere({ product, side }) {
  const isSolar = product.world === 'solar';

  return (
    <motion.article
      className={`group relative min-h-[78vh] overflow-hidden ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_54%_18%,rgba(255,193,89,0.34),transparent_22rem),linear-gradient(145deg,#080503_0%,#632b08_54%,#0b0603_100%)]'
          : 'bg-[radial-gradient(circle_at_52%_22%,rgba(142,14,29,0.38),transparent_24rem),linear-gradient(145deg,#030202_0%,#36070d_52%,#050403_100%)]'
      }`}
      initial={{ opacity: 0, y: 48, filter: 'blur(22px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 1.15, ease: luxuryEase }}
    >
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(112deg,transparent_10%,rgba(255,255,255,0.08)_42%,transparent_56%)]" />
      <motion.div
        className={`absolute inset-y-[9%] ${side === 'left' ? 'right-[-12%] left-[22%]' : 'left-[-12%] right-[22%]'}`}
        whileInView={{ scale: [1.03, 1], y: [26, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: luxuryEase }}
      >
        <ProductVisual product={product} className="h-full bg-transparent" />
      </motion.div>
      <div className={`absolute inset-0 ${isSolar ? 'bg-[linear-gradient(90deg,rgba(0,0,0,0.62),transparent_58%)]' : 'bg-[linear-gradient(90deg,rgba(0,0,0,0.76),transparent_62%)]'}`} />
      <div className="relative z-10 flex min-h-[78vh] items-end p-6 sm:p-10 lg:p-14">
        <div className="max-w-[34rem] pb-6">
          <p className="eyebrow">{isSolar ? 'Amber light' : 'Black lacquer'}</p>
          <h2 className="mt-6 font-serif text-[clamp(4.4rem,8vw,9.4rem)] leading-[0.76] text-porcelain">
            {product.name}
          </h2>
          <p className="mt-7 text-xl leading-8 text-cream/70">
            {isSolar
              ? 'Sun-warmed fruit, cream and amber held close to skin.'
              : 'Cherry, rose, smoke and velvet pressed into shadow.'}
          </p>
          <AccordRail product={product} tone={isSolar ? 'gold' : 'light'} />
        </div>
      </div>
    </motion.article>
  );
}

function EditorialFragrance({ product, reverse = false }) {
  const isSolar = product.world === 'solar';

  return (
    <section
      className={`relative min-h-dvh overflow-hidden ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_76%_16%,rgba(255,201,105,0.26),transparent_30rem),linear-gradient(180deg,#090603_0%,#3f1b06_48%,#070403_100%)]'
          : 'bg-[radial-gradient(circle_at_26%_18%,rgba(142,14,29,0.25),transparent_30rem),linear-gradient(180deg,#030202_0%,#1d0407_48%,#030202_100%)]'
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06),transparent_35%,rgba(255,255,255,0.04)_62%,transparent)]" />
      <div className="relative grid min-h-dvh items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12">
        <MotionSection className={`relative min-h-[58vh] lg:min-h-[82vh] ${reverse ? 'lg:order-2' : ''}`} slow>
          <ProductVisual product={product} className="absolute inset-0 bg-transparent" />
        </MotionSection>
        <MotionSection className="relative z-10 max-w-2xl lg:px-10" slow>
          <p className="eyebrow">{product.world === 'solar' ? 'Golden heat' : 'Dark cherry'}</p>
          <h2 className="mt-7 font-serif text-[clamp(4.2rem,8vw,9.6rem)] leading-[0.78] text-porcelain">
            {product.world === 'solar' ? 'Heat, softened.' : 'Smoke, polished.'}
          </h2>
          <p className="mt-8 text-2xl leading-10 text-cream/70">{product.campaign}</p>
          <AccordRail product={product} tone={isSolar ? 'gold' : 'light'} />
          <Link className="button-lux button-lux-primary mt-12" href={`/product/${product.slug}`}>
            Explore {product.name}
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1.02, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 0.2], [0, -34]);

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden bg-[#020101]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(142,14,29,0.28),transparent_31rem),radial-gradient(circle_at_76%_42%,rgba(194,106,27,0.2),transparent_32rem)]" />
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <ProductVisual product={noir} priority className="h-full bg-transparent" imageClassName="object-[52%_42%]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.34)_47%,rgba(0,0,0,0.78)),linear-gradient(180deg,rgba(0,0,0,0.14),transparent_48%,rgba(0,0,0,0.9))]" />
        <div className="absolute inset-x-[10%] bottom-[4vh] h-[24vh] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.18),transparent_62%)] blur-2xl" />

        <div className="relative z-10 flex min-h-dvh items-end px-5 pb-[10vh] pt-28 sm:px-8 lg:px-12">
          <motion.div className="max-w-5xl" style={{ y: copyY }} variants={revealSlow} initial="hidden" animate="visible">
            <h1 className="font-serif text-[clamp(5.6rem,15vw,16rem)] font-semibold leading-[0.7] text-porcelain">
              VALOIR
            </h1>
            <p className="mt-8 max-w-2xl text-2xl leading-9 text-cream/75 md:text-4xl md:leading-[1.14]">
              Dark cherry. Golden heat. A signature that stays.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Link className="button-lux button-lux-primary" href="/shop">
                Discover the Collection
              </Link>
              <Link className="button-lux" href="#dna">
                Explore the DNA
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="dna" className="grid lg:grid-cols-2">
        <Atmosphere product={noir} side="left" />
        <Atmosphere product={luna} side="right" />
      </section>

      <EditorialFragrance product={noir} />
      <EditorialFragrance product={luna} reverse />

      <section id="newsletter" className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(142,14,29,0.18),transparent_30rem),radial-gradient(circle_at_82%_30%,rgba(215,188,133,0.13),transparent_30rem)]" />
        <MotionSection className="relative mx-auto max-w-5xl" slow>
          <NewsletterForm />
        </MotionSection>
      </section>
    </>
  );
}
