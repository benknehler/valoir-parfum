'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from './CartContext.jsx';
import QuantityControl from './QuantityControl.jsx';
import { formatPrice } from '../lib/products.js';
import { luxuryEase } from '../lib/motion.js';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, subtotal, updateQuantity, removeItem } = useCart();
  const pathname = usePathname();
  const normalizedPathname = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  const isDtcExperience =
    normalizedPathname === '/neu' ||
    normalizedPathname === '/kollektion' ||
    normalizedPathname === '/ueber-uns' ||
    normalizedPathname.startsWith('/produkt/');
  const collectionHref = isDtcExperience ? '/kollektion' : '/shop';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            className="fixed inset-0 z-[70] bg-charcoal/25 backdrop-blur-xl"
            type="button"
            aria-label="Warenkorb schließen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-[520px] flex-col border-l border-gold/20 bg-pearl/90 text-charcoal shadow-luxury backdrop-blur-2xl"
            initial={{ x: '100%', filter: 'blur(16px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
            exit={{ x: '100%', filter: 'blur(12px)' }}
            transition={{ duration: 0.72, ease: luxuryEase }}
            aria-label="Warenkorb"
          >
            <div className="flex items-center justify-between border-b border-gold/20 px-6 py-6">
              <div>
                <p className="eyebrow">Auswahl</p>
                <h2 className="font-serif text-5xl leading-none">Warenkorb</h2>
              </div>
              <button
                className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/10 bg-pearl/70 transition-colors hover:border-gold/50"
                type="button"
                aria-label="Warenkorb schließen"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-7">
              {cartItems.length === 0 ? (
                <div className="flex min-h-[52vh] flex-col justify-center">
                  <p className="eyebrow">Noch leer</p>
                  <h3 className="mt-5 font-serif text-5xl leading-none">Dein Warenkorb ist leer.</h3>
                  <p className="body-lux mt-6">Entdecke die Valoir Kollektion.</p>
                  <Link href={collectionHref} className="button-lux button-lux-primary mt-8" onClick={() => setIsCartOpen(false)}>
                    Kollektion entdecken
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <article key={`${item.product.id}-${item.size}`} className="grid grid-cols-[92px_1fr] gap-4 border-b border-gold/20 pb-6">
                      <div className="relative h-28 overflow-hidden rounded-[1.2rem] bg-linen">
                        <Image src={item.product.image} alt={item.product.imageAlt} fill className="object-cover object-[50%_44%]" />
                        <div className="absolute inset-0 bg-pearl/20" />
                      </div>
                      <div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-2xl leading-none">{item.product.name}</h3>
                            <p className="mt-2 text-xs uppercase tracking-nav text-charcoal/50">{item.size}</p>
                            <p className="mt-1 text-xs text-charcoal/40">{formatPrice(item.unitPrice)} pro Stück</p>
                          </div>
                          <strong className="text-sm text-charcoal">{formatPrice(item.total)}</strong>
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-4">
                          <QuantityControl
                            value={item.quantity}
                            label={`Menge für ${item.product.name}`}
                            onChange={(quantity) => updateQuantity(item.product.id, item.size, quantity)}
                          />
                          <button
                            className="text-[0.68rem] font-semibold uppercase tracking-nav text-charcoal/50 transition-colors hover:text-gold"
                            type="button"
                            onClick={() => removeItem(item.product.id, item.size)}
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gold/20 px-6 py-6">
              <label htmlFor="drawer-discount" className="eyebrow">
                Rabattcode
              </label>
              <input id="drawer-discount" className="lux-input mt-3" placeholder="VALOIR10" />
              <div className="mt-6 flex items-center justify-between text-sm uppercase tracking-nav text-charcoal/60">
                <span>Zwischensumme</span>
                <strong className="text-lg tracking-normal text-charcoal">{formatPrice(subtotal)}</strong>
              </div>
              <button className="button-lux button-lux-primary mt-6 w-full" type="button">
                Zur Kasse
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-charcoal/40">
                Steuern und Versand werden beim Bezahlen berechnet.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
