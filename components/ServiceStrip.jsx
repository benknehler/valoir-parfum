import { serviceNotes } from '../lib/products.js';

export default function ServiceStrip() {
  return (
    <section className="border-y border-white/10 bg-[#050302]/80">
      <div className="lux-container grid gap-y-1 py-4 md:grid-cols-4">
        {serviceNotes.map((note) => (
          <div key={note} className="py-3 text-center text-[0.64rem] font-semibold uppercase tracking-luxury text-cream/50">
            {note}
          </div>
        ))}
      </div>
    </section>
  );
}
