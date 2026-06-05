'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from './CartContext.jsx';

export default function CartPage() {
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);

  return (
    <section className="lux-container flex min-h-[78vh] items-center justify-center py-32 text-center">
      <div className="max-w-2xl">
        <p className="eyebrow">Private selection</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-porcelain md:text-8xl">
          Your cart is open.
        </h1>
        <p className="body-lux mx-auto mt-8 max-w-xl">
          Review shadow lacquer, solar amber and the size that follows you longest.
        </p>
        <Link href="/shop" className="button-lux button-lux-primary mt-10">
          Continue Collection
        </Link>
      </div>
    </section>
  );
}
