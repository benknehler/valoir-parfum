'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './CartContext.jsx';
import MotionSection from './MotionSection.jsx';
import { formatPrice, products } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';

const filters = ['All', 'Fruity', 'Amber', 'Woody', 'Floral', 'Warm', 'Dark'];

export default function ShopPage() {
  const [active, setActive] = useState('All');
  const { addToCart } = useCart();
  const visibleProducts = useMemo(
    () => (active === 'All' ? products : products.filter((product) => product.family.includes(active))),
    [active]
  );

  return (
    <>
      <section className="lux-container flex min-h-[72vh] items-end pb-20 pt-36">
        <motion.div className="max-w-5xl" variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Shop the Collection</p>
          <h1 className="section-title mt-6">Fragrance, edited to its strongest form.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            A precise collection of signatures: dark fruit, solar warmth, polished woods and amber
            trails designed for lasting presence.
          </p>
        </motion.div>
      </section>

      <section className="lux-container pb-32">
        <MotionSection className="mb-12 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`border px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-nav transition-all duration-500 ease-luxury ${
                active === filter
                  ? 'border-champagne bg-champagne text-ink'
                  : 'border-white/10 bg-white/[0.025] text-cream/60 hover:border-champagne/50 hover:text-porcelain'
              }`}
              type="button"
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </MotionSection>

        <div className="grid gap-9 lg:grid-cols-2">
          {visibleProducts.map((product) => (
            <MotionSection key={product.id} className="group relative min-h-[720px] overflow-hidden bg-white/[0.025]" slow>
              <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
              <div className="absolute inset-0">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.035]"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.05),rgba(5,4,3,0.88))]" />
              <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_26%,rgba(255,255,255,0.11)_50%,transparent_72%)] transition-transform duration-[1600ms] ease-luxury group-hover:translate-x-[120%]" />
              <div className="relative z-20 flex min-h-[720px] flex-col justify-end p-7 sm:p-10">
                <p className="eyebrow">{product.collection}</p>
                <h2 className="mt-5 font-serif text-6xl leading-none text-porcelain md:text-7xl">{product.name}</h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-cream/70">{product.short}</p>
                <div className="mt-7 flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-nav text-cream/40">{product.family.join(' / ')}</p>
                    <strong className="mt-2 block text-lg text-champagne">{formatPrice(product.price)}</strong>
                  </div>
                  <button
                    className="button-lux pointer-events-auto relative z-30"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      addToCart(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  );
}
