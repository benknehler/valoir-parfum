'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { dtcFilters, dtcProfiles } from '../../lib/dtcContent.js';
import { luxuryEase } from '../../lib/motion.js';
import { formatPrice, products } from '../../lib/products.js';
import { useCart } from '../CartContext.jsx';
import DtcLayout from './DtcLayout.jsx';
import DtcProductScene from './DtcProductScene.jsx';

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 38, filter: 'blur(16px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.92, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}

function ProductModule({ product, index }) {
  const { addToCart } = useCart();
  const profile = dtcProfiles[product.slug];
  const mirrored = index % 2 === 1;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[3rem] bg-pearl/74 shadow-[0_34px_120px_rgba(68,46,24,0.1)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 46, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 1.04, delay: index * 0.08, ease: luxuryEase }}
    >
      <div
        className={`absolute inset-0 ${
          product.world === 'solar'
            ? 'bg-[radial-gradient(circle_at_82%_20%,rgba(189,122,47,0.18),transparent_28rem),linear-gradient(140deg,#fffdf8,#f4e8d7)]'
            : 'bg-[radial-gradient(circle_at_16%_18%,rgba(123,31,43,0.14),transparent_27rem),linear-gradient(140deg,#fffdf8,#efe4d8)]'
        }`}
      />
      <div className={`relative grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-12 ${mirrored ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative min-h-[32rem] overflow-hidden rounded-[2.4rem]">
          <DtcProductScene product={product} className="absolute inset-0 rounded-[2.4rem] transition-transform duration-[1600ms] ease-luxury group-hover:scale-[1.012]" />
          <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.42)_45%,transparent_62%)] transition-transform duration-[1500ms] ease-luxury group-hover:translate-x-[120%]" />
        </div>

        <div className="px-1 py-6 sm:px-3 lg:px-8">
          <p className={`eyebrow mb-6 ${product.world === 'solar' ? 'text-amber' : 'text-cherry'}`}>{product.collection}</p>
          <h2 className="font-serif text-[clamp(3.4rem,7vw,7.4rem)] font-semibold leading-[0.86] text-charcoal">
            {product.name}
          </h2>
          <p className="mt-8 max-w-md text-xl leading-9 text-charcoal/65">{profile.atmosphere}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {product.family.map((entry) => (
              <span key={entry} className="rounded-full bg-pearl/72 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/54">
                {entry}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/42">Größen</p>
              <p className="mt-2 text-sm text-charcoal/68">50 ml / 100 ml</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/42">Preis ab</p>
              <p className="mt-2 text-sm text-charcoal/68">{formatPrice(product.price)}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link className="button-lux button-lux-primary" href={`/produkt/${product.slug}`}>
              Duft ansehen <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <button className="button-lux" type="button" onClick={() => addToCart(product.id)}>
              Schnell hinzufügen <Plus size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function DtcCollectionPage() {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        if (activeFilter === 'Alle') return true;
        return dtcProfiles[product.slug].filters.includes(activeFilter);
      }),
    [activeFilter]
  );

  return (
    <DtcLayout>
      <section className="relative overflow-hidden pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(214,189,134,0.32),transparent_31rem),radial-gradient(circle_at_82%_10%,rgba(189,122,47,0.11),transparent_28rem),linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)]" />
        <div className="lux-container relative pb-16 sm:pb-24">
          <Reveal className="max-w-4xl">
            <p className="eyebrow mb-6">Kollektion</p>
            <h1 className="font-serif text-[clamp(4rem,10vw,10rem)] font-semibold leading-[0.82] text-charcoal">
              Valoir Kollektion
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-charcoal/66">
              Zwei Duftsignaturen. Reduziert auf das Wesentliche.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-12 flex flex-wrap gap-2">
            {dtcFilters.map((filter) => (
              <button
                key={filter}
                className={`rounded-full border px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-nav transition-all duration-500 ease-luxury ${
                  activeFilter === filter
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-gold/24 bg-pearl/48 text-charcoal/54 hover:border-gold/70 hover:text-charcoal'
                }`}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-40">
        <div className="lux-container grid gap-10">
          {visibleProducts.map((product, index) => (
            <ProductModule key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </DtcLayout>
  );
}
