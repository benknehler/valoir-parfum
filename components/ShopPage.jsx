'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { products } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

function ProductModule({ product, reverse = false }) {
  const isSolar = product.world === 'solar';

  return (
    <MotionSection
      className={`relative overflow-hidden py-20 sm:py-28 lg:py-36 ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_78%_16%,rgba(214,189,134,0.42),transparent_28rem),linear-gradient(135deg,#fffdf8_0%,#f4e2c8_56%,#fff9ef_100%)]'
          : 'bg-[radial-gradient(circle_at_24%_14%,rgba(123,31,43,0.15),transparent_26rem),linear-gradient(135deg,#fffdf8_0%,#eee1d2_54%,#fbf7ef_100%)]'
      }`}
      slow
    >
      <div className="lux-container grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          className={`group relative h-[620px] ${reverse ? 'lg:order-2' : ''}`}
          whileHover={{ scale: 1.006 }}
          transition={{ duration: 1.2, ease: luxuryEase }}
        >
          <div className="absolute inset-0 rounded-[2.8rem] bg-pearl/50 shadow-luxury" />
          <div className="absolute inset-0 translate-x-[-130%] bg-[linear-gradient(106deg,transparent_24%,rgba(255,255,255,0.62)_50%,transparent_72%)] transition-transform duration-[1800ms] ease-luxury group-hover:translate-x-[130%]" />
          <ProductVisual product={product} className="absolute inset-[3%]" imageClassName="object-[50%_43%]" />
        </motion.div>

        <div className="max-w-2xl">
          <p className="eyebrow">{product.collection}</p>
          <h2 className="mt-6 font-serif text-[clamp(4rem,8vw,8.8rem)] font-semibold leading-[0.82] text-charcoal">
            {product.name}
          </h2>
          <p className="mt-8 max-w-xl text-2xl leading-10 text-charcoal/70">{product.campaign}</p>
          <div className="mt-9 grid max-w-xl gap-4 sm:grid-cols-2">
            {product.accords.map((accord) => (
              <span key={accord} className="border-t border-gold/25 pt-4 text-[0.68rem] font-semibold uppercase tracking-luxury text-charcoal/60">
                {accord}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <span className="text-xs font-semibold uppercase tracking-nav text-charcoal/50">50 ml / 100 ml</span>
            <Link className="button-lux button-lux-primary" href={`/product/${product.slug}`}>
              Duft ansehen
            </Link>
            <Link className="button-lux" href={`/product/${product.slug}`}>
              Mehr entdecken
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export default function ShopPage() {
  return (
    <>
      <section className="relative flex min-h-[68vh] items-end overflow-hidden pb-20 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,189,134,0.34),transparent_34rem),linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)]" />
        <motion.div className="lux-container relative max-w-[1500px]" variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Kollektion</p>
          <h1 className="section-title mt-6 max-w-5xl">Zwei Duftwelten, bewusst reduziert.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            Valoir konzentriert sich auf zwei Signaturen: eine dunkle Kirschkomposition und eine warme, goldene Frucht-Ambra.
          </p>
        </motion.div>
      </section>

      {products.map((product, index) => (
        <ProductModule key={product.id} product={product} reverse={index % 2 === 1} />
      ))}
    </>
  );
}
