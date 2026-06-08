'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { luxuryEase } from '../../lib/motion.js';

function NoteColumn({ title, notes }) {
  return (
    <div className="grid gap-4 border-t border-champagne/22 pt-5">
      <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-luxury text-champagne/76">
        {title}
      </p>
      <div className="grid gap-3">
        {notes.map((note) => (
          <span
            key={note}
            className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/72"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScentMotionScene({
  product,
  productName,
  tone = 'dark-cerise',
  headline,
  subline,
  notes,
  visualTheme = [],
}) {
  const shouldReduceMotion = useReducedMotion();
  const isSolar = tone === 'golden-solea' || product?.world === 'solar';
  const titleId = `scent-motion-${product?.slug || productName.toLowerCase().replace(/\s+/g, '-')}`;
  const videoSrc = isSolar ? '/videos/luna-composition.mp4' : '/videos/noir-composition.mp4';
  const topNotes = notes?.Kopfnote || [];
  const heartNotes = notes?.Herznote || [];
  const baseNotes = notes?.Basisnote || [];
  const [themePrimary = isSolar ? 'goldene waerme' : 'bordeaux'] = visualTheme;

  return (
    <section
      className="relative isolate overflow-hidden bg-ink text-ivory"
      aria-labelledby={titleId}
    >
      <div
        className={`absolute inset-0 ${
          isSolar
            ? 'bg-[radial-gradient(circle_at_50%_18%,rgba(255,216,143,0.42),transparent_31rem),radial-gradient(circle_at_80%_56%,rgba(255,157,58,0.24),transparent_28rem),linear-gradient(180deg,#29160b_0%,#7b4118_46%,#1c120d_100%)]'
            : 'bg-[radial-gradient(circle_at_50%_18%,rgba(123,31,43,0.4),transparent_31rem),radial-gradient(circle_at_78%_58%,rgba(214,189,134,0.14),transparent_28rem),linear-gradient(180deg,#150c0c_0%,#2a1015_48%,#110b0a_100%)]'
        }`}
      />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(112deg,transparent_0%,rgba(255,255,255,0.34)_48%,transparent_56%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_100%,90px_90px]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ivory/76 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ivory/72 to-transparent" />

      <div className="lux-container relative py-24 sm:py-32 lg:py-40">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 38, filter: 'blur(18px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 1.05, ease: luxuryEase }}
        >
          <p className="eyebrow mb-6 text-champagne/82">{productName}</p>
          <h2
            id={titleId}
            className="font-serif text-[clamp(3.5rem,8vw,8.7rem)] font-semibold leading-[0.88] text-ivory"
          >
            {headline}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory/68 sm:text-xl sm:leading-9">
            {subline}
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-16 max-w-[1320px] overflow-hidden rounded-[2.8rem] border border-champagne/12 bg-[#150c0c]/58 shadow-[0_40px_150px_rgba(0,0,0,0.34)]"
          initial={{ opacity: 0, y: 54, filter: 'blur(22px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 1.18, ease: luxuryEase }}
        >
          <div
            className={`absolute inset-0 ${
              isSolar
                ? 'bg-[radial-gradient(circle_at_64%_38%,rgba(255,228,174,0.28),transparent_30rem),radial-gradient(circle_at_20%_72%,rgba(255,174,77,0.18),transparent_28rem)]'
                : 'bg-[radial-gradient(circle_at_50%_42%,rgba(137,29,45,0.28),transparent_30rem),radial-gradient(circle_at_82%_78%,rgba(214,189,134,0.12),transparent_28rem)]'
            }`}
          />
          <div className="relative grid gap-8 p-4 sm:p-6 lg:grid-cols-[0.72fr_1.58fr_0.72fr] lg:p-8">
            <div className="order-2 grid content-between gap-8 px-3 pb-4 lg:order-1 lg:py-8">
              <div>
                <span className="inline-flex rounded-full border border-champagne/20 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-luxury text-champagne/78">
                  {themePrimary}
                </span>
              </div>
              <NoteColumn title="Kopfnote" notes={topNotes.slice(0, Math.ceil(topNotes.length / 2))} />
              <NoteColumn title="Herznote" notes={heartNotes.slice(0, 3)} />
            </div>

            <div className="order-1 overflow-hidden rounded-[2.2rem] bg-black/22 lg:order-2">
              <div className="relative aspect-video min-h-[22rem] lg:min-h-[36rem]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={videoSrc}
                  poster={product.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlay={(event) => {
                    if (!shouldReduceMotion) event.currentTarget.play().catch(() => {});
                  }}
                  aria-label={`${productName} Kompositionsvideo: Duftbestandteile laufen zusammen und der Flakon gleitet in die Szene.`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_58%,rgba(0,0,0,0.22))]" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-[0.62rem] font-semibold uppercase tracking-luxury text-ivory/72">
                  <span>15 Sekunden Loop</span>
                  <span>Duftbestandteile · Flakon · Aura</span>
                </div>
              </div>
            </div>

            <div className="order-3 grid content-between gap-8 px-3 pb-4 lg:py-8">
              <NoteColumn title="Lichtakzent" notes={topNotes.slice(Math.ceil(topNotes.length / 2))} />
              <NoteColumn title="Tiefe" notes={heartNotes.slice(3)} />
              <NoteColumn title="Basisnote" notes={baseNotes} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
