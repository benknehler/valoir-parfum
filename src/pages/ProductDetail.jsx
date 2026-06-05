import { ArrowRight, Check, ShieldCheck, Truck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import QuantityStepper from '../components/QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice, getProductBySlug } from '../data/products.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  function addCurrentToCart() {
    addToCart(product.id, Number(quantity));
  }

  return (
    <section className="section product-detail" data-accent={product.accent}>
      <div className="gallery" data-reveal>
        <div className="gallery-main">
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <div className="gallery-thumbs">
          <div>
            <img src={product.image} alt={`${product.name} Flakon Detail`} loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Valoir DNA</p>
            <h3>{product.family}</h3>
          </div>
        </div>
      </div>

      <div className="product-info" data-reveal>
        <p className="eyebrow">{product.volume}</p>
        <h1>{product.name}</h1>
        <p className="product-subtitle">{product.shortDescription}</p>
        <p className="detail-price">{formatPrice(product.price)}</p>

        <div className="accord-list" aria-label="Akkorde">
          {product.accords.map((accord) => (
            <span key={accord}>{accord}</span>
          ))}
        </div>

        <div className="note-pyramid" aria-label="Duftpyramide">
          {Object.entries(product.notes).map(([group, notes]) => (
            <div key={group}>
              <h2>{group}</h2>
              <p>{notes.join(' · ')}</p>
            </div>
          ))}
        </div>

        <div className="purchase-panel">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button className="button button-dark" type="button" onClick={addCurrentToCart}>
            In den Warenkorb
          </button>
          <button className="button button-accent" type="button" onClick={addCurrentToCart}>
            <span>Jetzt kaufen</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="delivery-notes">
          <p>
            <Truck size={18} aria-hidden="true" /> Versand in 2-4 Werktagen
          </p>
          <p>
            <ShieldCheck size={18} aria-hidden="true" /> Sichere Zahlung und 14 Tage Rückgabe
          </p>
        </div>

        <div className="accordion">
          <details open>
            <summary>Duftbeschreibung</summary>
            <p>{product.longDescription}</p>
          </details>
          <details>
            <summary>Duftnoten</summary>
            {Object.entries(product.notes).map(([group, notes]) => (
              <p key={group}>
                <strong>{group}:</strong> {notes.join(', ')}
              </p>
            ))}
          </details>
          <details>
            <summary>Inhaltsstoffe / Hinweise</summary>
            <p>{product.ingredients}</p>
          </details>
          <details>
            <summary>Versand</summary>
            <p>
              Kostenloser Standardversand ab 150,00 €. Dieser Checkout ist als Dummy-Struktur
              angelegt und kann später an Stripe, Shopify Checkout oder ein eigenes Backend
              angebunden werden.
            </p>
          </details>
        </div>

        <Link className="text-link back-link" to="/shop">
          <Check size={16} aria-hidden="true" /> Zurück zur Kollektion
        </Link>
      </div>
    </section>
  );
}
