'use client';

import { useId, useState } from 'react';
import { subscribeNewsletter } from '../lib/newsletter/subscribe.ts';

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = useId();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setMessage('');

    try {
      await subscribeNewsletter(email, 'public_newsletter');
      setMessage('Bitte bestätige deine Anmeldung über die E-Mail von Valoir.');
      setEmail('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Die Anmeldung konnte nicht gespeichert werden.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={`relative overflow-hidden rounded-[2.4rem] ${
        compact ? 'py-8' : 'bg-charcoal/[0.88] px-6 py-12 text-ivory shadow-luxury backdrop-blur-2xl sm:px-12 lg:px-16 lg:py-16'
      }`}
      onSubmit={handleSubmit}
    >
      {!compact && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(214,189,134,0.28),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(123,31,43,0.16),transparent_26rem)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/80 to-transparent" />
        </>
      )}
      <div className="relative">
        <p className="font-sans text-[0.67rem] font-semibold uppercase tracking-luxury text-champagne">Newsletter</p>
        <h2 className={`${compact ? 'mt-4 font-serif text-5xl leading-none' : 'mt-6 font-serif text-[clamp(3.6rem,6.6vw,7.8rem)] font-semibold leading-[0.86]'} text-ivory`}>
          Bleib nah an Valoir.
        </h2>
        <p className="mt-7 max-w-2xl text-base leading-8 text-ivory/70 sm:text-lg">
          Erhalte 10 % auf deine erste Valoir-Bestellung und exklusiven Zugang zu neuen Duftkompositionen.
        </p>
      </div>
      <div className="relative mt-10 grid gap-5 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor={id}>
          E-Mail-Adresse
        </label>
        <input
          id={id}
          className="h-14 w-full border-0 border-b border-champagne/50 bg-transparent px-0 text-sm text-ivory outline-none transition-colors duration-500 placeholder:text-ivory/40 focus:border-ivory"
          type="email"
          value={email}
          required
          placeholder="E-Mail-Adresse"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button-lux button-lux-primary border-champagne bg-champagne text-charcoal" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Speichern...' : 'Anmelden'}
        </button>
      </div>
      {message && <p className="relative mt-5 text-sm text-champagne">{message}</p>}
    </form>
  );
}
