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
        <p className="eyebrow">Warenkorb</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-charcoal md:text-8xl">
          Deine Auswahl ist geöffnet.
        </h1>
        <p className="body-lux mx-auto mt-8 max-w-xl">
          Prüfe Duft, Größe und Menge im Warenkorb. Die Kaufstrecke ist vorbereitet und kann später angebunden werden.
        </p>
        <Link href="/shop" className="button-lux button-lux-primary mt-10">
          Zur Kollektion
        </Link>
      </div>
    </section>
  );
}
