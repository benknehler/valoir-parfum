'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionSection from './MotionSection.jsx';
import ProductVisual from './ProductVisual.jsx';
import { products } from '../lib/products.js';
import { revealSlow } from '../lib/motion.js';
import { assetPath } from '../lib/assets.js';

const values = [
  ['Eleganz', 'Reduktion, die nicht leer wirkt. Jede Linie muss atmen.'],
  ['Präsenz', 'Ein Duft soll leise beginnen und lange im Raum bleiben.'],
  ['Sinnlichkeit', 'Frucht, Blüte, Holz und Ambra werden als Nähe gedacht.'],
  ['Duftkunst', 'Moderne Kompositionen mit klarer Struktur und warmer Tiefe.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="lux-container grid min-h-dvh items-center gap-14 pb-24 pt-32 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div variants={revealSlow} initial="hidden" animate="visible">
          <p className="eyebrow">Über Valoir</p>
          <h1 className="section-title mt-6 max-w-5xl">Duft als Form von Präsenz.</h1>
          <p className="body-lux mt-8 max-w-2xl">
            Valoir Parfum entwickelt Düfte für Menschen, die nicht lauter wirken möchten,
            sondern genauer. Jede Komposition trägt eine klare Stimmung: dunkle Tiefe oder
            goldene Wärme.
          </p>
        </motion.div>
        <motion.div
          variants={revealSlow}
          initial="hidden"
          animate="visible"
          className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[2.6rem] bg-pearl shadow-luxury"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,189,134,0.42),transparent_24rem),linear-gradient(180deg,#fffdf8,#f1e6d5)]" />
          <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum Logo" fill className="object-cover opacity-90 mix-blend-multiply" priority />
        </motion.div>
      </section>

      <section className="section-space border-y border-gold/20 bg-pearl/40">
        <div className="lux-container grid items-end gap-14 lg:grid-cols-2">
          <MotionSection className="relative h-[680px]" slow>
            <ProductVisual product={products[1]} className="absolute inset-0" imageClassName="object-[50%_43%]" />
          </MotionSection>
          <MotionSection slow>
            <p className="eyebrow">Haus Valoir</p>
            <h2 className="mt-6 font-serif text-[clamp(3.8rem,7vw,7.8rem)] font-semibold leading-[0.88] text-charcoal">
              Zwei Signaturen, bewusst kuratiert.
            </h2>
            <p className="body-lux mt-8">
              Noir Cerice trägt rote Frucht, Rose und Rauch in eine dunkle Tiefe.
              Luna Solea setzt Pfirsich, Mango und Vanille-Amber in warmes Licht.
            </p>
            <p className="body-lux mt-6">
              Valoir bleibt klein in der Auswahl, präzise im Ausdruck und großzügig in der Wirkung.
            </p>
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <MotionSection className="mb-14 max-w-4xl" slow>
          <p className="eyebrow">Werte</p>
          <h2 className="section-title mt-6">Was bleibt.</h2>
        </MotionSection>
        <div className="grid gap-4 md:grid-cols-4">
          {values.map(([title, text]) => (
            <MotionSection key={title} className="min-h-[300px] rounded-[1.8rem] bg-pearl/70 p-8 shadow-[0_20px_80px_rgba(68,46,24,0.08)]" slow>
              <h3 className="font-serif text-4xl leading-none text-charcoal">{title}</h3>
              <p className="mt-8 leading-7 text-charcoal/60">{text}</p>
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  );
}
