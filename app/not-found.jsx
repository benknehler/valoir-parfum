import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="lux-container flex min-h-[78vh] items-center justify-center py-28 text-center">
      <div className="max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-charcoal md:text-8xl">
          Diese Spur endet hier.
        </h1>
        <p className="body-lux mx-auto mt-8 max-w-xl">
          Die gesuchte Seite ist nicht verfügbar. Die Kollektion bleibt erreichbar.
        </p>
        <Link className="button-lux button-lux-primary mt-10" href="/shop">
          Zur Kollektion
        </Link>
      </div>
    </section>
  );
}
