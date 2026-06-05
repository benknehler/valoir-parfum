import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

export default function ProductCard({ product, featured = false }) {
  const { addToCart } = useCart();

  return (
    <article className={`product-card ${featured ? 'is-featured' : ''}`} data-accent={product.accent}>
      <Link to={`/produkt/${product.slug}`} className="product-image-link" aria-label={`${product.name} ansehen`}>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
      </Link>
      <div className="product-card-content">
        <div>
          <p className="eyebrow">{product.family}</p>
          <h3>{product.name}</h3>
          <p>{product.shortDescription}</p>
        </div>
        <div className="product-card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <div className="card-actions">
            <Link className="button button-ghost" to={`/produkt/${product.slug}`}>
              <span>Zum Produkt</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <button className="button button-dark" type="button" onClick={() => addToCart(product.id)}>
              <ShoppingBag size={17} aria-hidden="true" />
              <span>In den Warenkorb</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
