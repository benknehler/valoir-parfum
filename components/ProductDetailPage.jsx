'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import QuantityControl from './QuantityControl.jsx';
import ScentPyramid from './ScentPyramid.jsx';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import { useCart } from './CartContext.jsx';
import { formatPrice, getProduct, getSizePrice } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';

function PerformanceBars({ product }) {
  return (
    <div className="grid gap-7">
      {Object.entries(product.performance).map(([label, value]) => (
        <div key={label}>
          <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-luxury text-cream/50">
            <span>{label}</span>
            <span>{value}</span>
          </div>
          <div className="mt-3 h-px bg-white/10">
            <div className="h-px bg-champagne" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AtmosphereTile({ product, title, tone }) {
  const isSolar = product.world === 'solar';

  return (
    <div
      className={`relative min-h-[260px] overflow-hidden ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_65%_25%,rgba(255,193,89,0.26),transparent_16rem),linear-gradient(135deg,#120804,#4b2108,#080503)]'
          : 'bg-[radial-gradient(circle_at_38%_24%,rgba(142,14,29,0.26),transparent_16rem),linear-gradient(135deg,#030202,#25060a,#050403)]'
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08)_45%,transparent_62%)]" />
      <div className="absolute inset-x-[12%] bottom-[16%] h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.18),transparent_62%)] blur-xl" />
      <div className="absolute bottom-6 left-6">
        <p className="text-[0.64rem] font-semibold uppercase tracking-luxury text-cream/50">{title}</p>
        <p className="mt-3 max-w-[16rem] text-sm leading-6 text-cream/60">{tone}</p>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ slug }) {
  const product = getProduct(slug);
  const [size, setSize] = useState('50 ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) notFound();

  const selectedPrice = getSizePrice(product, size);

  function handleAdd() {
    addToCart(product.id, { size, quantity: Number(quantity) });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      <section className="lux-container grid gap-12 pb-24 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:pt-40">
        <motion.div variants={revealSlow} initial="hidden" animate="visible" className="grid gap-5">
          <div className="relative min-h-[72vh] overflow-hidden">
            <ProductVisual product={product} priority className="absolute inset-0" />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="relative min-h-[260px] overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} bottle detail`}
                fill
                sizes="(min-width: 1024px) 22vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxury hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.5))]" />
            </div>
            <AtmosphereTile product={product} title="Packaging" tone="Black carton, champagne seal, weight in the hand." />
            <AtmosphereTile product={product} title="On skin" tone={product.world === 'solar' ? 'Warm fruit, cream and amber in soft focus.' : 'Cherry, smoke and velvet against cold air.'} />
          </div>
        </motion.div>

        <motion.aside
          variants={revealSlow}
          initial="hidden"
          animate="visible"
          className="lg:sticky lg:top-28 lg:self-start lg:pl-8"
        >
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-6 font-serif text-[clamp(4.8rem,9vw,9rem)] leading-[0.76] text-porcelain">
            {product.name}
          </h1>
          <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-luxury text-cream/50">
            {product.family.join(' / ')}
          </p>
          <p className="mt-8 text-xl leading-9 text-cream/70">{product.short}</p>

          <div className="mt-10 flex items-end justify-between gap-6 border-y border-white/10 py-7">
            <div>
              <p className="text-xs uppercase tracking-nav text-cream/40">Selected size</p>
              <strong className="mt-2 block text-2xl font-normal text-champagne">{formatPrice(selectedPrice)}</strong>
            </div>
            <Link href="/shop" className="text-xs font-semibold uppercase tracking-nav text-cream/50 transition-colors hover:text-champagne">
              Back to collection
            </Link>
          </div>

          <div className="mt-10">
            <p className="eyebrow">Size</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {product.sizes.map((entry) => (
                <button
                  key={entry.label}
                  className={`min-h-16 border px-5 text-left transition-all duration-500 ease-luxury ${
                    size === entry.label
                      ? 'border-champagne bg-champagne text-ink'
                      : 'border-white/10 text-cream/60 hover:border-champagne/50 hover:text-porcelain'
                  }`}
                  type="button"
                  onClick={() => setSize(entry.label)}
                >
                  <span className="block text-sm">{entry.label}</span>
                  <span className="mt-1 block text-xs uppercase tracking-nav opacity-70">{formatPrice(entry.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <QuantityControl value={quantity} onChange={setQuantity} />
            <button className="button-lux button-lux-primary flex-1" type="button" onClick={handleAdd}>
              {added ? 'Added' : 'Add to Cart'}
            </button>
          </div>
          <button className="button-lux mt-4 w-full" type="button" onClick={handleAdd}>
            Buy Now
          </button>

          <div className="mt-9 grid gap-4 text-sm leading-6 text-cream/60">
            <p>Ships in 2-4 business days from the Valoir studio.</p>
            <p>Gift wrapping is available for every 50 ml and 100 ml bottle.</p>
          </div>
        </motion.aside>
      </section>

      <section className="section-space border-y border-white/10">
        <div className="lux-container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionSection slow>
            <h2 className="section-title">{product.world === 'solar' ? 'Heat, softened.' : 'Smoke, polished.'}</h2>
          </MotionSection>
          <MotionSection slow>
            <p className="text-2xl leading-10 text-cream/75">{product.story}</p>
            <p className="body-lux mt-8">{product.campaign}</p>
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.95fr]">
          <MotionSection slow>
            <h2 className="mb-12 font-serif text-[clamp(3.8rem,7vw,8rem)] leading-[0.82] text-porcelain">
              Notes in three movements.
            </h2>
            <ScentPyramid product={product} refined />
          </MotionSection>
          <MotionSection className="grid gap-14 lg:pt-24" slow>
            <div>
              <h3 className="font-serif text-5xl leading-none text-porcelain">Performance</h3>
              <div className="mt-8">
                <PerformanceBars product={product} />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-5xl leading-none text-porcelain">When to wear</h3>
              <div className="mt-7 flex flex-wrap gap-3">
                {product.whenToWear.map((occasion) => (
                  <span key={occasion} className="border-t border-champagne/20 px-1 py-3 text-sm uppercase tracking-nav text-cream/60">
                    {occasion}
                  </span>
                ))}
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="lux-container pb-32">
        <MotionSection className="grid gap-px bg-white/10 lg:grid-cols-3" slow>
          {[
            ['Shipping & Returns', 'Complimentary shipping from 100€. Sealed fragrances may be returned within 14 days of delivery.'],
            ['Ingredients', product.ingredients],
            ['Care', 'Store away from direct heat and sunlight. Apply to pulse points and allow the fragrance to settle without rubbing.'],
          ].map(([title, text]) => (
            <div key={title} className="bg-ink px-6 py-9 sm:px-9">
              <h3 className="text-[0.68rem] font-semibold uppercase tracking-luxury text-champagne/70">{title}</h3>
              <p className="mt-6 text-sm leading-7 text-cream/60">{text}</p>
            </div>
          ))}
        </MotionSection>
      </section>
    </>
  );
}
