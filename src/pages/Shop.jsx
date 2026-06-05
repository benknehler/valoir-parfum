import ProductCard from '../components/ProductCard.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import { products } from '../data/products.js';

export default function Shop() {
  return (
    <>
      <section className="page-hero shop-hero">
        <div className="page-hero-copy" data-reveal>
          <p className="eyebrow">Shop</p>
          <h1>Signature-Düfte von Valoir.</h1>
          <p>
            Zwei charaktervolle Eau de Parfum Kompositionen. Dunkel, golden, modern und auf eine
            elegante Sillage hin gebaut.
          </p>
        </div>
      </section>
      <TrustStrip />
      <section className="section shop-section">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
