'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from './CartContext.jsx';
import QuantityControl from './QuantityControl.jsx';
import { formatPrice } from '../lib/products.js';
import { luxuryEase } from '../lib/motion.js';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-xl"
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-[500px] flex-col border-l border-white/10 bg-ink/80 text-porcelain backdrop-blur-2xl"
            initial={{ x: '100%', filter: 'blur(16px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
            exit={{ x: '100%', filter: 'blur(12px)' }}
            transition={{ duration: 0.72, ease: luxuryEase }}
            aria-label="Cart drawer"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
              <div>
                <p className="eyebrow">Private selection</p>
                <h2 className="font-serif text-5xl leading-none">Cart</h2>
              </div>
              <button className="grid h-11 w-11 place-items-center border border-white/10 bg-white/[0.02] transition-colors hover:border-champagne/50" type="button" aria-label="Close cart" onClick={() => setIsCartOpen(false)}>
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-7">
              {cartItems.length === 0 ? (
                <div className="flex min-h-[52vh] flex-col justify-center">
                  <p className="eyebrow">Empty</p>
                  <h3 className="mt-5 font-serif text-5xl leading-none">Nothing selected yet.</h3>
                  <p className="body-lux mt-6">
                    Begin with shadow lacquer or solar amber.
                  </p>
                  <Link href="/shop" className="button-lux button-lux-primary mt-8" onClick={() => setIsCartOpen(false)}>
                    Discover Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <article key={`${item.product.id}-${item.size}`} className="grid grid-cols-[92px_1fr] gap-4 border-b border-white/10 pb-6">
                      <div className="relative h-28 overflow-hidden bg-white/[0.04]">
                        <Image src={item.product.image} alt={item.product.imageAlt} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-2xl leading-none">{item.product.name}</h3>
                            <p className="mt-2 text-xs uppercase tracking-nav text-cream/50">{item.size}</p>
                            <p className="mt-1 text-xs text-cream/40">{formatPrice(item.unitPrice)} each</p>
                          </div>
                          <strong className="text-sm text-champagne">{formatPrice(item.total)}</strong>
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-4">
                          <QuantityControl
                            value={item.quantity}
                            label={`Quantity for ${item.product.name}`}
                            onChange={(quantity) => updateQuantity(item.product.id, item.size, quantity)}
                          />
                          <button
                            className="text-[0.68rem] font-semibold uppercase tracking-nav text-cream/50 transition-colors hover:text-champagne"
                            type="button"
                            onClick={() => removeItem(item.product.id, item.size)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-6">
              <label htmlFor="drawer-discount" className="eyebrow">
                Private code
              </label>
              <input id="drawer-discount" className="lux-input mt-3" placeholder="VALOIR10" />
              <div className="mt-6 flex items-center justify-between text-sm uppercase tracking-nav text-cream/60">
                <span>Subtotal</span>
                <strong className="text-lg tracking-normal text-porcelain">{formatPrice(subtotal)}</strong>
              </div>
              <button className="button-lux button-lux-primary mt-6 w-full" type="button">
                Proceed to Checkout
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-cream/40">
                Taxes and delivery are calculated at checkout.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
