import { serviceNotes } from '../lib/products.js';

export default function ServiceStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <div className="lux-container grid gap-px md:grid-cols-4">
        {serviceNotes.map((note) => (
          <div key={note} className="py-5 text-center text-[0.68rem] font-semibold uppercase tracking-nav text-cream/60">
            {note}
          </div>
        ))}
      </div>
    </section>
  );
}
