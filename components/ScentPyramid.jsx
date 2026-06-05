export default function ScentPyramid({ product, refined = false }) {
  return (
    <div className={refined ? 'grid gap-7' : 'grid gap-8 md:grid-cols-3'}>
      {Object.entries(product.notes).map(([layer, notes], index) => (
        <article
          key={layer}
          className={`relative overflow-hidden ${
            refined
              ? `${index === 0 ? 'ml-[18%]' : index === 1 ? 'ml-[9%]' : 'ml-0'} border-t border-champagne/20 py-7`
              : 'border-t border-champagne/20 py-8'
          }`}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-luxury text-champagne/50">
            0{index + 1}
          </span>
          <h3 className="mt-4 font-serif text-5xl leading-none text-porcelain">{layer}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {notes.map((note) => (
              <span key={note} className="bg-white/[0.035] px-3 py-2 text-xs text-cream/70">
                {note}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
