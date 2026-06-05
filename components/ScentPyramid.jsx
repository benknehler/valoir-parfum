export default function ScentPyramid({ product, refined = false }) {
  return (
    <div className={refined ? 'grid gap-8' : 'grid gap-6 md:grid-cols-3'}>
      {Object.entries(product.notes).map(([layer, notes], index) => (
        <article
          key={layer}
          className={`relative ${refined ? 'border-b border-white/10 pb-7' : 'glass-panel p-7'}`}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-luxury text-champagne/50">
            0{index + 1}
          </span>
          <h3 className="mt-4 font-serif text-4xl leading-none text-porcelain">{layer}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {notes.map((note) => (
              <span key={note} className="border border-champagne/20 bg-champagne/[0.06] px-3 py-2 text-xs text-cream/70">
                {note}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
