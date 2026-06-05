'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext.jsx';
import { luxuryEase } from '../lib/motion.js';
import { assetPath } from '../lib/assets.js';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Maison' },
  { href: '/shop', label: 'Collection' },
  { href: '/#dna', label: 'DNA' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { count, setIsCartOpen } = useCart();

  useEffect(() => {
    return scrollY.on('change', (value) => setScrolled(value > 24));
  }, [scrollY]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-luxury ${
          scrolled ? 'border-b border-white/10 bg-ink/60 shadow-luxury backdrop-blur-2xl' : 'bg-transparent'
        }`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: luxuryEase }}
      >
        <div className="lux-container grid h-20 grid-cols-[auto_1fr_auto] items-center gap-5 lg:h-24">
          <Link href="/" className="group flex items-center gap-3" aria-label="Valoir home">
            <span className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-champagne/40">
              <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum" fill className="object-cover" priority />
            </span>
            <span className="font-serif text-2xl font-semibold text-porcelain">Valoir</span>
          </Link>

          <nav className="hidden items-center justify-center gap-10 lg:flex" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="group relative text-[0.68rem] font-semibold uppercase tracking-nav text-cream/70 transition-colors duration-500 hover:text-porcelain">
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-500 ease-luxury group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              className="group relative grid h-11 w-11 place-items-center border border-white/15 bg-white/[0.03] text-porcelain backdrop-blur-xl transition-colors duration-500 hover:border-champagne/60"
              type="button"
              aria-label={`Open cart with ${count} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-champagne px-1 text-[0.65rem] font-bold text-ink">
                {count}
              </span>
            </button>
            <button
              className="grid h-11 w-11 place-items-center border border-white/15 bg-white/[0.03] text-porcelain backdrop-blur-xl transition-colors duration-500 hover:border-champagne/60 lg:hidden"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
            className="fixed inset-0 z-40 bg-ink/92 px-6 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(14px)' }}
            transition={{ duration: 0.55, ease: luxuryEase }}
          >
            <div className="hairline" />
            <nav className="grid py-9" aria-label="Mobile navigation">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.65, ease: luxuryEase }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-6 font-serif text-5xl leading-none text-porcelain"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
