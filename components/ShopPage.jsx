'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { useCart } from './CartContext.jsx';
import { formatPrice, products } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

function ProductPanel({ product, index }) {
  const { addToCart } = useCart();
  const isSolar = product.world === 'solar';

  return (
    <MotionSection
      className={`group relative min-h-dvh overflow-hidden ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_62%_18%,rgba(255,193,89,0.32),transparent_24rem),linear-gradient(150deg,#090604_0%,#642b08_54%,#070403_100%)]'
          : 'bg-[radial-gradient(circle_at_45%_18%,rgba(142,14,29,0.36),transparent_25rem),linear-gradient(150deg,#030202_0%,#31070d_55%,#050403_100%)]'
      }`}
      slow
    >
      <motion.div
        className={`absolute inset-y-[5%] ${index === 0 ? 'right-[-16%] left-[18%]' : 'left-[-14%] right-[18%]'}`}
        whileHover={{ scale: 1.018 }}
        transition={{ duration: 1.2, ease: luxuryEase }}
      >
        <ProductVisual product={product} className="h-full bg-transparent" />
      </motion.div>
      <div className="absolute inset-0 translate-x-[-130%] bg-[linear-gradient(106deg,transparent_24%,rgba(255,255,255,0.12)_50%,transparent_72%)] transition-transform duration-[1900ms] ease-luxury group-hover:translate-x-[130%]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.72))]" />

      <div className="relative z-10 flex min-h-dvh items-end px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-[38rem]">
          <p className="eyebrow">{product.family.join(' / ')}</p>
          <h2 className="mt-6 font-serif text-[clamp(4.8rem,9vw,10rem)] leading-[0.76] text-porcelain">
            {product.name}
          </h2>
          <p className="mt-7 max-w-md text-xl leading-8 text-cream/70">{product.accordLine}</p>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-5">
            {product.sizes.map((size) => (
              <div key={size.label} className="border-t border-champagne/30 pt-5">
                <span className="block text-[0.68rem] font-semibold uppercase tracking-luxury text-cream/50">
                  {size.label}
                </span>
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
}

export default function ShopPage() {
  return (
    <>
      <section className="relative flex min-h-[64vh] items-end overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(215,188,133,0.11),transparent_34rem),linear-gradient(180deg,#030202,#140706)]" />
        <motion.div className="relative max-w-6xl" variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Collection</p>
          <h1 className="section-title mt-6">Choose an atmosphere.</h1>
        </motion.div>
      </section>
      <section className="grid lg:grid-cols-2">
        {products.map((product, index) => (
          <ProductPanel key={product.id} product={product} index={index} />
        ))}
      </section>
    </>
  );
}
