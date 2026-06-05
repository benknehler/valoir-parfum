import { notFound } from 'next/navigation';
import MotionSection from './MotionSection.jsx';
import { getInfoPage } from '../lib/infoPages.js';

export default function InfoPage({ slug }) {
  const page = getInfoPage(slug);

  if (!page) notFound();

  return (
    <section className="lux-container min-h-dvh pb-32 pt-36">
      <MotionSection className="max-w-5xl" slow>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="section-title mt-6">{page.title}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-9 text-cream/70">{page.intro}</p>
      </MotionSection>

      <MotionSection className="mt-24 grid gap-px bg-white/10 lg:grid-cols-3" slow>
        {page.details.map(([title, text]) => (
          <article key={title} className="min-h-[260px] bg-ink px-7 py-9 sm:px-10">
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-luxury text-champagne/70">{title}</h2>
            <p className="mt-7 leading-7 text-cream/60">{text}</p>
          </article>
        ))}
      </MotionSection>
    </section>
  );
}
