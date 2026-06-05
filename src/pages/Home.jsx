import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup.jsx';
import ProductCard from '../components/ProductCard.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import { products } from '../data/products.js';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img className="hero-bottle hero-bottle-noir" src={products[0].image} alt="" />
          <img className="hero-bottle hero-bottle-luna" src={products[1].image} alt="" />
        </div>
        <div className="hero-content" data-reveal>
          <p className="eyebrow">Signature Collection</p>
          <h1>Valoir Parfum</h1>
          <p>Luxus, der auf der Haut bleibt.</p>
          <div className="hero-actions">
            <Link to="/shop" className="button button-light">
              <span>Jetzt entdecken</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/newsletter" className="button button-outline-light">
              10% Rabatt sichern
            </Link>
          </div>
        </div>
        <a className="scroll-cue" href="#showcase" aria-label="Zur Produktshowcase springen">
          <ChevronDown size={24} aria-hidden="true" />
        </a>
      </section>

      <TrustStrip />

      <section id="showcase" className="section showcase-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Noir & Soleil</p>
          <h2>Zwei Duftwelten, eine klare Signatur.</h2>
          <p>
            Valoir verbindet Kontrast und Wärme: dunkle Kirschfacetten, goldene Frucht, cremige
            Hölzer und eine Basis, die lange nachklingt.
          </p>
        </div>
        <div className="showcase-grid">
          {products.map((product) => (
            <div className="showcase-panel" key={product.id} data-reveal data-accent={product.accent}>
              <img src={product.image} alt={product.imageAlt} loading="lazy" />
              <div>
                <p className="eyebrow">{product.mood}</p>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <Link to={`/produkt/${product.slug}`} className="text-link">
                  Duft entdecken <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section claim-band">
        <div data-reveal>
          <Sparkles size={22} aria-hidden="true" />
          <p>
            Parfum als persönliches Statement: elegant, sinnlich und präzise komponiert für
            Menschen, die Tiefe nicht erklären müssen.
          </p>
        </div>
      </section>

      <section className="section dna-section">
        <div className="section-heading narrow" data-reveal>
          <p className="eyebrow">Duft-DNA</p>
          <h2>Facetten, die sich mit der Haut verbinden.</h2>
        </div>
        <div className="dna-grid">
          {['Fruchtige Spannung', 'Florale Tiefe', 'Cremige Wärme', 'Amber & Holz'].map((item) => (
            <article key={item} className="dna-card" data-reveal>
              <span />
              <h3>{item}</h3>
              <p>
                Akkorde mit Charakter, modern aufgebaut und auf eine elegante Sillage hin komponiert.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section signature-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Signature Düfte</p>
          <h2>Bestseller im Valoir Atelier.</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </section>

      <section className="section art-section">
        <div className="art-copy" data-reveal>
          <p className="eyebrow">Die Kunst von Valoir</p>
          <h2>Kompositionen mit Tiefe, nicht Lautstärke.</h2>
          <p>
            Jede Formel ist als moderner Luxusmoment gedacht: klare Akkorde, polierte Wärme und
            ein sinnlicher Verlauf vom ersten Aufsprühen bis zur letzten Spur auf Textil und Haut.
          </p>
          <Link to="/ueber-uns" className="button button-dark">
            <span>Mehr über Valoir</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="art-image" data-reveal>
          <img src={products[1].image} alt="Luna Solea als warme Valoir Duftkomposition" loading="lazy" />
        </div>
      </section>

      <section className="section newsletter-section" data-reveal>
        <NewsletterSignup />
      </section>
    </>
  );
}
