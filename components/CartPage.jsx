'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext.jsx';

export default function CartPage() {
  const { setIsCartOpen, clearCart } = useCart();
  const [stripeState, setStripeState] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('stripe') || '';
    setStripeState(state);
    if (state === 'success') {
      clearCart();
      setIsCartOpen(false);
    } else {
      setIsCartOpen(true);
    }
  }, []);

  const headline =
    stripeState === 'success'
      ? 'Danke für deine Bestellung.'
      : stripeState === 'cancelled'
        ? 'Deine Auswahl bleibt erhalten.'
        : 'Deine Auswahl ist geöffnet.';

  const text =
    stripeState === 'success'
      ? 'Die Zahlungsbestätigung wird über Stripe verarbeitet. Deine Bestellung erscheint anschließend im Valoir Admin-Bereich.'
      : stripeState === 'cancelled'
        ? 'Der Checkout wurde abgebrochen. Du kannst deine Auswahl prüfen und erneut zur Kasse gehen.'
        : 'Prüfe Duft, Größe und Menge im Warenkorb. Der sichere Checkout wird über Stripe geöffnet.';

  return (
    <section className="lux-container flex min-h-[78vh] items-center justify-center py-32 text-center">
      <div className="max-w-2xl">
        <p className="eyebrow">Warenkorb</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-charcoal md:text-8xl">
          {headline}
        </h1>
        <p className="body-lux mx-auto mt-8 max-w-xl">
          {text}
        </p>
        <Link href="/kollektion" className="button-lux button-lux-primary mt-10">
          Zur Kollektion
        </Link>
      </div>
    </section>
  );
}
