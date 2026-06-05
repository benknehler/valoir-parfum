'use client';

import { useId, useState } from 'react';

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const id = useId();

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <form
      className={`relative overflow-hidden ${
        compact ? 'py-8' : 'bg-ink/70 px-6 py-12 backdrop-blur-2xl sm:px-12 lg:px-16 lg:py-16'
      }`}
      onSubmit={handleSubmit}
    >
      {!compact && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(142,14,29,0.18),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(215,188,133,0.14),transparent_26rem)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
        </>
      )}
      <div className="relative">
        <p className="eyebrow">A private list for early access.</p>
        <h2 className={`${compact ? 'mt-4 font-serif text-5xl leading-none' : 'mt-6 font-serif text-[clamp(3.8rem,7vw,8rem)] leading-[0.82]'} text-porcelain`}>
          Join the private list.
        </h2>
        <p className="body-lux mt-7 max-w-2xl">
          Receive 10% on your first Valoir order and private access to new releases.
        </p>
      </div>
      <div className="relative mt-10 grid gap-5 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          className="lux-input"
          type="email"
          value={email}
          required
          placeholder="Email address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button-lux button-lux-primary" type="submit">
          Join
        </button>
      </div>
      {submitted && <p className="relative mt-5 text-sm text-champagne">Your private code VALOIR10 is ready.</p>}
    </form>
  );
}
