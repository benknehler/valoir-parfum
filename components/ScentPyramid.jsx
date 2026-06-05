export default function ScentPyramid({ product, refined = false }) {
  return (
    <div className={refined ? 'grid gap-7' : 'grid gap-8 md:grid-cols-3'}>
      {Object.entries(product.notes).map(([layer, notes], index) => (
        <article
          key={layer}
          className={`relative overflow-hidden ${
            refined
              ? `${index === 0 ? 'ml-[18%]' : index === 1 ? 'ml-[9%]' : 'ml-0'} border-t border-gold/25 py-7`
              : 'border-t border-gold/25 py-8'
          }`}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-luxury text-gold/70">
            0{index + 1}
          </span>
          <h3 className="mt-4 font-serif text-5xl leading-none text-charcoal">{layer}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {notes.map((note) => (
              <span key={note} className="rounded-full bg-pearl/70 px-3 py-2 text-xs text-charcoal/60 shadow-[0_10px_36px_rgba(68,46,24,0.06)]">
                {note}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
