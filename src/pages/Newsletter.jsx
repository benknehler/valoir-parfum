import NewsletterSignup from '../components/NewsletterSignup.jsx';
import { products } from '../data/products.js';

export default function Newsletter() {
  return (
    <section className="page-hero newsletter-page">
      <div className="page-hero-copy" data-reveal>
        <p className="eyebrow">Valoir Club</p>
        <h1>10% Rabatt auf deine erste Bestellung.</h1>
        <p>
          Erhalte Zugang zu Launches, Duftnotizen und exklusiven Valoir Momenten. Kein Lärm, nur
          kuratierte Duftkunst.
        </p>
        <NewsletterSignup compact />
      </div>
      <div className="page-hero-image split-products" data-reveal>
        <img src={products[0].image} alt="Noir Cerice Parfum" />
        <img src={products[1].image} alt="Luna Solea Parfum" />
      </div>
    </section>
  );
}
