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
    <form className={compact ? '' : 'glass-panel p-8 sm:p-12'} onSubmit={handleSubmit}>
      <p className="eyebrow">Join the private list.</p>
      <h2 className={`${compact ? 'mt-4 font-serif text-4xl leading-none' : 'mt-6 font-serif text-6xl leading-none'} text-porcelain`}>
        Receive 10% on your first Valoir order.
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto]">
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
          Enter
        </button>
      </div>
      {submitted && <p className="mt-5 text-sm text-champagne">Your private code VALOIR10 is ready.</p>}
    </form>
  );
}
