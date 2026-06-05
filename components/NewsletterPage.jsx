import NewsletterForm from './NewsletterForm.jsx';
import ProductVisual from './ProductVisual.jsx';
import { products } from '../lib/products.js';

export default function NewsletterPage() {
  return (
    <section className="lux-container grid min-h-dvh items-center gap-12 pb-24 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="eyebrow">Private Access</p>
        <h1 className="section-title mt-6">Join before the scent arrives.</h1>
        <p className="body-lux mt-8 max-w-xl">
          Receive private launch notes, early collection access and 10% on your first Valoir order.
        </p>
        <div className="mt-10">
          <NewsletterForm compact />
        </div>
      </div>
      <ProductVisual product={products[1]} className="min-h-[620px]" />
    </section>
  );
}
