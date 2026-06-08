'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext.jsx';
import { assetPath } from '../../lib/assets.js';
import { luxuryEase } from '../../lib/motion.js';

const nav = [
  { href: '/', label: 'Start' },
  { href: '/kollektion', label: 'Kollektion' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/#newsletter', label: 'Newsletter' },
];

export default function DtcHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { count, setIsCartOpen } = useCart();

  useEffect(() => scrollY.on('change', (value) => setScrolled(value > 18)), [scrollY]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxury ${
          scrolled
            ? 'border-b border-gold/18 bg-ivory/76 shadow-[0_18px_70px_rgba(65,44,24,0.07)] backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
        initial={{ y: -90, opacity: 0, filter: 'blur(14px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.82, ease: luxuryEase }}
      >
        <div className="mx-auto grid h-[5.8rem] max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 sm:px-8 lg:h-[7rem] lg:px-12">
          <Link href="/" className="group flex items-center gap-3" aria-label="Valoir Startseite">
            <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-gold/26 transition-transform duration-700 ease-luxury group-hover:scale-[1.04] lg:h-[4.6rem] lg:w-[4.6rem]">
              <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum Logo" fill className="object-cover" priority />
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-10 lg:flex" aria-label="Hauptnavigation neue Version">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-[0.68rem] font-semibold uppercase tracking-nav text-charcoal/58 transition-colors duration-500 hover:text-charcoal"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxury group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              className="group relative inline-flex h-11 items-center justify-center gap-3 rounded-full bg-transparent px-2 text-charcoal transition-colors duration-500 ease-luxury hover:text-gold lg:px-4"
              type="button"
              aria-label={`Warenkorb mit ${count} Artikeln öffnen`}
              onClick={() => setIsCartOpen(true)}
            >
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-nav lg:inline">Warenkorb</span>
              <ShoppingBag size={17} aria-hidden="true" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-charcoal px-1 text-[0.62rem] font-bold text-ivory">
                {count}
              </span>
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/10 bg-pearl/64 text-charcoal backdrop-blur-xl transition-all duration-500 ease-luxury hover:border-gold/60 hover:bg-pearl lg:hidden"
              type="button"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-hidden bg-ivory/96 px-6 pt-32 text-charcoal backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(14px)' }}
            transition={{ duration: 0.58, ease: luxuryEase }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(214,189,134,0.28),transparent_22rem),radial-gradient(circle_at_86%_74%,rgba(123,31,43,0.1),transparent_24rem)]" />
            <nav className="relative grid border-t border-gold/20" aria-label="Mobile Navigation neue Version">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.68, ease: luxuryEase }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-gold/20 py-6 font-serif text-5xl leading-none text-charcoal"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative mt-10 grid gap-3">
              <button
                className="button-lux button-lux-primary w-full"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setIsCartOpen(true);
                }}
              >
                Warenkorb öffnen
              </button>
              <Link className="button-lux w-full" href="/" onClick={() => setMenuOpen(false)}>
                Zur Kampagnen-Version
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
