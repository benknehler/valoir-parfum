import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuantityStepper from '../components/QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

export default function Cart() {
  const { cartItems, subtotal, updateQuantity, removeItem } = useCart();
  const shippingText = subtotal >= 150 ? 'Kostenloser Versand aktiviert' : 'Kostenloser Versand ab 150,00 €';

  return (
    <section className="section cart-page">
      <div className="section-heading narrow" data-reveal>
        <p className="eyebrow">Warenkorb</p>
        <h1>Deine Valoir Auswahl.</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart" data-reveal>
          <ShoppingBag size={34} aria-hidden="true" />
          <h2>Dein Warenkorb ist noch leer.</h2>
          <p>Entdecke Noir Cerice und Luna Solea und baue deine erste Duftsignatur.</p>
          <Link to="/shop" className="button button-dark">
            Zum Shop
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" data-reveal>
            {cartItems.map(({ product, quantity, lineTotal }) => (
              <article className="cart-item" key={product.id}>
                <Link to={`/produkt/${product.slug}`}>
                  <img src={product.image} alt={product.imageAlt} />
                </Link>
                <div className="cart-item-main">
                  <div>
                    <p className="eyebrow">{product.volume}</p>
                    <h2>{product.name}</h2>
                    <p>{product.subtitle}</p>
                  </div>
                  <QuantityStepper
                    value={quantity}
                    onChange={(nextQuantity) => updateQuantity(product.id, nextQuantity)}
                    label={`Menge für ${product.name}`}
                  />
                </div>
                <div className="cart-item-side">
                  <strong>{formatPrice(lineTotal)}</strong>
                  <button type="button" className="remove-button" onClick={() => removeItem(product.id)}>
                    <Trash2 size={17} aria-hidden="true" />
                    <span>Entfernen</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary" data-reveal>
            <h2>Zusammenfassung</h2>
            <div className="summary-row">
              <span>Zwischensumme</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Versand</span>
              <strong>{shippingText}</strong>
            </div>
            <label htmlFor="discount">Rabattcode</label>
            <div className="discount-row">
              <input id="discount" type="text" placeholder="VALOIR10" />
              <button type="button">Anwenden</button>
            </div>
            <button className="button button-accent checkout-button" type="button">
              <span>Zum Checkout</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p>
              Dummy-Checkout: bereit für eine spätere Integration mit Stripe, Shopify Checkout
              oder eigenem Backend.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
