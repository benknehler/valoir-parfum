'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import QuantityControl from './QuantityControl.jsx';
import ScentPyramid from './ScentPyramid.jsx';
import { useCart } from './CartContext.jsx';
import { formatPrice, getProduct } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

export default function ProductDetailPage({ slug }) {
  const product = getProduct(slug);
  const [size, setSize] = useState('50 ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) notFound();

  function handleAdd() {
    addToCart(product.id, { size, quantity: Number(quantity) });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <section className="lux-container grid gap-12 pb-32 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:pt-40">
      <motion.div variants={revealSlow} initial="hidden" animate="visible" className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
        <div className="relative min-h-[620px] overflow-hidden bg-white/[0.025] lg:min-h-[780px]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.02),rgba(5,4,3,0.28))]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[product.image, product.image].map((image, index) => (
            <div key={index} className="relative h-44 overflow-hidden bg-white/[0.035]">
              <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={revealSlow} initial="hidden" animate="visible" className="lg:pl-8">
        <p className="eyebrow">{product.collection}</p>
        <h1 className="mt-6 font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.82] text-porcelain">{product.name}</h1>
        <p className="mt-7 text-xl leading-9 text-cream/70">{product.short}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {product.family.map((tag) => (
            <span key={tag} className="border border-champagne/20 bg-champagne/[0.06] px-3 py-2 text-xs uppercase tracking-nav text-cream/70">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-end justify-between gap-6 border-y border-white/10 py-7">
          <div>
            <p className="text-xs uppercase tracking-nav text-cream/40">Price</p>
            <strong className="mt-2 block text-2xl text-champagne">{formatPrice(product.price)}</strong>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-nav text-cream/50 transition-colors hover:text-champagne">
            Back to collection
          </Link>
        </div>

        <div className="mt-10">
          <p className="eyebrow">Size</p>
          <div className="mt-4 flex gap-3">
            {product.sizes.map((entry) => (
              <button
                key={entry}
                className={`min-h-12 border px-6 text-sm transition-all duration-500 ease-luxury ${
                  size === entry ? 'border-champagne bg-champagne text-ink' : 'border-white/12 text-cream/60 hover:border-champagne/50'
                }`}
                type="button"
                onClick={() => setSize(entry)}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <QuantityControl value={quantity} onChange={setQuantity} />
          <button className="button-lux button-lux-primary flex-1" type="button" onClick={handleAdd}>
            {added ? 'Added' : 'Add to Cart'}
          </button>
          <button className="button-lux flex-1" type="button" onClick={handleAdd}>
            Buy Now
          </button>
        </div>

        <div className="mt-12">
          <ScentPyramid product={product} refined />
        </div>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {[
            ['Description', product.story],
            ['Scent Notes', Object.entries(product.notes).map(([layer, notes]) => `${layer}: ${notes.join(', ')}`).join(' / ')],
            ['Ingredients', product.ingredients],
            ['Shipping & Returns', 'Complimentary shipping over 100€. 14-day return window for unopened products.'],
          ].map(([title, text], index) => (
            <details key={title} open={index === 0} className="group">
              <summary className="cursor-pointer list-none py-6 text-sm font-semibold uppercase tracking-nav text-porcelain">
                {title}
              </summary>
              <p className="body-lux pb-7">{text}</p>
            </details>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
