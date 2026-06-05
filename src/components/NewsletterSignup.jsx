import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputId = `newsletter-email-${useId().replace(/:/g, '')}`;

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <form className={`newsletter-form ${compact ? 'is-compact' : ''}`} onSubmit={handleSubmit}>
      {!compact && <p className="eyebrow">Newsletter</p>}
      <h2>{compact ? '10% Rabatt sichern' : 'Erhalte 10% Rabatt auf deine erste Bestellung.'}</h2>
      <div className="field-row">
        <label className="sr-only" htmlFor={inputId}>
          E-Mail-Adresse
        </label>
        <input
          id={inputId}
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="button button-dark">
          <span>Rabatt sichern</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      {submitted && <p className="form-note">Danke. Dein Code VALOIR10 wartet in deinem Postfach.</p>}
    </form>
  );
}
