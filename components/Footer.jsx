import Link from 'next/link';
import NewsletterForm from './NewsletterForm.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink/88 py-16 text-porcelain">
      <div className="lux-container grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.2fr]">
        <div>
          <p className="eyebrow">Valoir Parfum</p>
          <h2 className="mt-5 max-w-md font-serif text-5xl leading-none">
            Fragrance as presence, not noise.
          </h2>
          <p className="body-lux mt-6 max-w-md">
            Valoir creates fragrances with presence — composed to feel intimate, memorable and
            quietly commanding.
          </p>
        </div>
        <div>
          <h3 className="eyebrow">Explore</h3>
          <div className="mt-6 grid gap-4 text-sm text-cream/60">
            <Link href="/">Home</Link>
            <Link href="/about">Maison</Link>
            <Link href="/shop">Collection</Link>
            <Link href="/newsletter">Private List</Link>
          </div>
        </div>
        <div>
          <h3 className="eyebrow">Service</h3>
          <div className="mt-6 grid gap-4 text-sm text-cream/60">
            <span>Shipping</span>
            <span>Returns</span>
            <span>Privacy</span>
            <span>Imprint</span>
          </div>
        </div>
        <NewsletterForm compact />
      </div>
      <div className="lux-container mt-14">
        <div className="hairline" />
        <div className="mt-6 flex flex-col justify-between gap-4 text-xs uppercase tracking-nav text-cream/40 md:flex-row">
          <span>© 2026 Valoir Parfum</span>
          <span>Luxury commerce prototype</span>
        </div>
      </div>
    </footer>
  );
}
