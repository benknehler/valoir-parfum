'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from './CartContext.jsx';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { formatPrice, products } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';

export default function ShopPage() {
  const { addToCart } = useCart();

  return (
    <>
      <section className="lux-container flex min-h-[78vh] items-end pb-20 pt-36">
        <motion.div className="max-w-6xl" variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Valoir collection</p>
          <h1 className="section-title mt-6">Two signatures, edited without excess.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            Shadow lacquer or solar amber. Choose the atmosphere, then choose how long it stays
            with you.
          </p>
        </motion.div>
      </section>

      <section className="lux-container pb-32">
        <div className="grid gap-10 lg:gap-14">
          {products.map((product, index) => {
            const isSolar = product.world === 'solar';

            return (
              <MotionSection
                key={product.id}
                className={`group relative min-h-[82vh] overflow-hidden ${
                  isSolar
                    ? 'bg-[radial-gradient(circle_at_72%_28%,rgba(255,188,82,0.25),transparent_25rem),linear-gradient(120deg,#080503_0%,#532408_50%,#0a0603_100%)]'
                    : 'bg-[radial-gradient(circle_at_23%_20%,rgba(142,14,29,0.28),transparent_25rem),linear-gradient(120deg,#030202_0%,#2b060b_50%,#050403_100%)]'
                }`}
                slow
              >
                <div className="absolute inset-0 translate-x-[-130%] bg-[linear-gradient(105deg,transparent_22%,rgba(255,255,255,0.13)_48%,transparent_72%)] transition-transform duration-[1800ms] ease-luxury group-hover:translate-x-[130%]" />
                <div className={`relative grid min-h-[82vh] items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative min-h-[52vh] lg:min-h-[74vh]">
                    <ProductVisual
                      product={product}
                      className="absolute inset-0 bg-transparent transition-transform duration-[1600ms] ease-luxury group-hover:scale-[1.018]"
                    />
                  </div>

                  <div className="relative z-10 max-w-xl px-2 pb-10 sm:px-6 lg:px-10 lg:pb-0">
                    <p className="eyebrow">{product.collection}</p>
                    <h2 className="mt-7 font-serif text-[clamp(4rem,8vw,9.5rem)] leading-[0.78] text-porcelain">
                      {product.name}
                    </h2>
                    <p className="mt-8 text-xl leading-9 text-cream/70">{product.accordLine}</p>
                    <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                      {product.family.map((family) => (
                        <span key={family} className="text-[0.68rem] font-semibold uppercase tracking-luxury text-cream/50">
                          {family}
                        </span>
                      ))}
                    </div>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2">
                      {product.sizes.map((size) => (
                        <div key={size.label} className="border-t border-champagne/20 pt-5">
                          <span className="block text-xs uppercase tracking-nav text-cream/50">{size.label}</span>
                          <strong className="mt-2 block text-xl font-normal text-champagne">{formatPrice(size.price)}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                      <button
                        className="button-lux button-lux-primary"
                        type="button"
                        onClick={() => addToCart(product.id, { size: '50 ml' })}
                      >
                        Quick Add
                      </button>
                      <Link className="button-lux" href={`/product/${product.slug}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionSection>
            );
          })}
        </div>
      </section>
    </>
  );
}
