'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { dtcValues } from '../../lib/dtcContent.js';
import { luxuryEase } from '../../lib/motion.js';
import { products } from '../../lib/products.js';
import DtcLayout from './DtcLayout.jsx';
import DtcProductScene from './DtcProductScene.jsx';

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.04, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}

export default function DtcAboutPage() {
  const noir = products.find((product) => product.slug === 'noir-cerice');
  const luna = products.find((product) => product.slug === 'luna-solea');

  return (
    <DtcLayout>
      <section className="relative overflow-hidden pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(214,189,134,0.3),transparent_31rem),radial-gradient(circle_at_86%_20%,rgba(189,122,47,0.11),transparent_27rem),linear-gradient(180deg,#fffdf8,#fbf7ef)]" />
        <div className="lux-container relative grid gap-14 pb-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-6">Maison</p>
            <h1 className="font-serif text-[clamp(4.6rem,12vw,12rem)] font-semibold leading-[0.78] text-charcoal">
              Über Valoir
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="max-w-3xl">
            <p className="font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Eine Duftmarke zwischen Sinnlichkeit, Klarheit und Präsenz.
            </p>
            <p className="mt-8 text-xl leading-10 text-charcoal/66">
              Valoir steht für moderne Duftkompositionen mit Tiefe. Jeder Duft entsteht aus Kontrasten: Licht und Schatten, Frucht und Holz, Wärme und Frische. Das Ergebnis sind Signaturen, die auf der Haut bleiben und im Gedächtnis nachwirken.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-36">
        <div className="lux-container grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Reveal className="relative min-h-[42rem] overflow-hidden rounded-[3rem] bg-pearl/70 shadow-[0_34px_120px_rgba(68,46,24,0.1)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#fffdf8,#f0e4d4)]" />
            <DtcProductScene product={noir} className="absolute bottom-8 left-8 top-8 w-[48%] rounded-[2.4rem]" />
            <DtcProductScene product={luna} className="absolute bottom-8 right-8 top-20 w-[48%] rounded-[2.4rem]" />
            <div className="absolute inset-x-[20%] bottom-[12%] h-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.14),transparent_66%)] blur-2xl" />
          </Reveal>
          <Reveal delay={0.08} className="grid gap-px overflow-hidden rounded-[3rem] bg-gold/18">
            {dtcValues.map(([title, text]) => (
              <div key={title} className="bg-pearl/76 p-8 backdrop-blur-xl sm:p-10">
                <p className="eyebrow mb-5">{title}</p>
                <p className="max-w-md font-serif text-3xl leading-tight text-charcoal">{text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-28 sm:pb-40">
        <div className="lux-container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[0.88] text-charcoal">
              Kompositionen aus Licht, Tiefe und Ruhe.
            </h2>
            <p className="mx-auto mt-9 max-w-2xl text-xl leading-9 text-charcoal/64">
              Jede Valoir-Signatur wird auf wenige klare Eindrücke verdichtet. Nicht lauter. Präziser.
            </p>
            <Link className="button-lux button-lux-primary mt-12" href="/kollektion">
              Kollektion entdecken <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </DtcLayout>
  );
}
