import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="lux-container flex min-h-[78vh] items-center justify-center py-28 text-center">
      <div className="max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-serif text-6xl leading-none text-porcelain md:text-8xl">Lost in the dark.</h1>
        <p className="body-lux mx-auto mt-8 max-w-xl">
          The fragrance you are looking for has moved into the shadows. The collection is still
          waiting.
        </p>
        <Link className="button-lux button-lux-primary mt-10" href="/shop">
          Shop the Collection
        </Link>
      </div>
    </section>
  );
}
