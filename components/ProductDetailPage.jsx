'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import QuantityControl from './QuantityControl.jsx';
import ScentPyramid from './ScentPyramid.jsx';
import ProductVisual from './ProductVisual.jsx';
import MotionSection from './MotionSection.jsx';
import { useCart } from './CartContext.jsx';
import { formatPrice, getProduct, getSizePrice } from '../lib/products.js';
import { luxuryEase, revealSlow } from '../lib/motion.js';

function PerformanceBars({ product }) {
  return (
    <div className="grid gap-7">
      {Object.entries(product.performance).map(([label, value]) => (
        <div key={label}>
          <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-luxury text-charcoal/50">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <div className="mt-3 h-px bg-gold/20">
            <div className="h-px bg-charcoal" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AtmosphereFrame({ product, title, tone, className = '' }) {
  const isSolar = product.world === 'solar';

  return (
    <div
      className={`relative min-h-[260px] overflow-hidden rounded-[2rem] ${className} ${
        isSolar
          ? 'bg-[radial-gradient(circle_at_70%_24%,rgba(214,189,134,0.48),transparent_18rem),linear-gradient(135deg,#fffdf8,#f2dec0,#fff8ee)]'
          : 'bg-[radial-gradient(circle_at_34%_22%,rgba(123,31,43,0.16),transparent_18rem),linear-gradient(135deg,#fffdf8,#eee0cf,#fbf7ef)]'
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.72),transparent_44%,rgba(255,255,255,0.44)_70%,transparent)]" />
      <div className="absolute inset-x-[12%] bottom-[12%] h-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.13),transparent_66%)] blur-xl" />
      <div className="absolute bottom-7 left-7 right-7">
        <p className="text-[0.66rem] font-semibold uppercase tracking-luxury text-gold">{title}</p>
        <p className="mt-3 max-w-[18rem] text-sm leading-6 text-charcoal/60">{tone}</p>
      </div>
    </div>
  );
}

function GalleryScene({ product, item }) {
  if (item.kind === 'visual') {
    return <ProductVisual product={product} priority={item.id === 'main'} className="absolute inset-0" />;
  }

  if (item.kind === 'image') {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-[2.2rem] bg-pearl">
        <Image
          src={product.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[50%_44%] [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_86%)]"
          priority={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.18),transparent_50%,rgba(251,247,239,0.5))]" />
      </div>
    );
  }

  return <AtmosphereFrame product={product} title={item.title} tone={item.tone} className="absolute inset-0 h-full min-h-full" />;
}

export default function ProductDetailPage({ slug }) {
  const product = getProduct(slug);
  const [size, setSize] = useState('50 ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeGallery, setActiveGallery] = useState('main');
  const { addToCart } = useCart();

  if (!product) return null;

  const selectedPrice = getSizePrice(product, size);
  const isSolar = product.world === 'solar';
  const gallery = [
    { id: 'main', label: 'Hauptbild', kind: 'visual' },
    { id: 'detail', label: 'Flakon', kind: 'image', alt: `${product.name} Flakon Detail` },
    {
      id: 'box',
      label: 'Geschenkbox',
      kind: 'atmosphere',
      title: 'Geschenkbox',
      tone: 'Cremefarbener Karton, feines Siegel und klare Linien.',
    },
    {
      id: 'skin',
      label: 'Auf Haut',
      kind: 'atmosphere',
      title: isSolar ? 'Warme Haut' : 'Abendlicht',
      tone: isSolar ? 'Goldene Frucht, Vanille und Ambra in weichem Licht.' : 'Dunkle Kirsche, Rose und Rauch nah an der Haut.',
    },
  ];
  const activeItem = gallery.find((item) => item.id === activeGallery) || gallery[0];

  function handleAdd() {
    addToCart(product.id, { size, quantity: Number(quantity) });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      <section className="lux-container grid gap-14 pb-24 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:pt-40">
        <motion.div variants={revealSlow} initial="hidden" animate="visible" className="grid gap-4">
          <div className="relative h-[72vh] min-h-[620px] overflow-hidden rounded-[2.6rem] bg-pearl shadow-luxury">
            <GalleryScene product={product} item={activeItem} />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {gallery.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`relative h-[132px] overflow-hidden rounded-[1.4rem] bg-pearl text-left shadow-[0_18px_60px_rgba(68,46,24,0.08)] transition-all duration-500 ease-luxury ${
                  activeGallery === item.id ? 'opacity-100 ring-1 ring-gold/40' : 'opacity-60 hover:opacity-95'
                }`}
                onClick={() => setActiveGallery(item.id)}
              >
                {item.kind === 'visual' ? (
                  <ProductVisual product={product} className="absolute inset-0 rounded-[1.4rem]" elevated={false} />
                ) : item.kind === 'image' ? (
                  <Image src={product.image} alt={item.alt} fill sizes="25vw" className="object-cover object-[50%_44%]" />
                ) : (
                  <AtmosphereFrame product={product} title={item.title} tone={item.tone} className="h-full min-h-full rounded-[1.4rem]" />
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-pearl/80 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-luxury text-charcoal/60 backdrop-blur">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.aside
          variants={revealSlow}
          initial="hidden"
          animate="visible"
          className="lg:sticky lg:top-28 lg:self-start lg:pl-8"
        >
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-6 font-serif text-[clamp(4.4rem,8vw,8.2rem)] font-semibold leading-[0.82] text-charcoal">
            {product.name}
          </h1>
          <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-luxury text-charcoal/50">
            {product.family.join(' / ')}
          </p>
          <p className="mt-8 max-w-xl text-xl leading-9 text-charcoal/70">{product.short}</p>

          <div className="mt-10 flex items-end justify-between gap-6 border-y border-gold/20 py-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-nav text-charcoal/40">Preis</p>
              <strong className="mt-2 block text-3xl font-normal text-charcoal">{formatPrice(selectedPrice)}</strong>
            </div>
            <Link href="/shop" className="text-xs font-semibold uppercase tracking-nav text-charcoal/50 transition-colors hover:text-gold">
              Zur Kollektion
            </Link>
          </div>

          <div className="mt-10">
            <p className="eyebrow">Größe</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {product.sizes.map((entry) => (
                <button
                  key={entry.label}
                  className={`min-h-16 rounded-full border px-5 text-left transition-all duration-500 ease-luxury ${
                    size === entry.label
                      ? 'border-charcoal bg-charcoal text-ivory'
                      : 'border-charcoal/10 bg-pearl/50 text-charcoal/60 hover:border-gold/50 hover:text-charcoal'
                  }`}
                  type="button"
                  onClick={() => setSize(entry.label)}
                >
                  <span className="block text-sm">{entry.label}</span>
                  <span className="mt-1 block text-xs uppercase tracking-nav opacity-70">{formatPrice(entry.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-4">Menge</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <QuantityControl value={quantity} label={`Menge für ${product.name}`} onChange={setQuantity} />
              <button className="button-lux button-lux-primary flex-1" type="button" onClick={handleAdd}>
                {added ? 'Hinzugefügt' : 'In den Warenkorb'}
              </button>
            </div>
          </div>
          <button className="button-lux mt-4 w-full" type="button" onClick={handleAdd}>
            Jetzt kaufen
          </button>

          <div className="mt-9 grid gap-4 text-sm leading-6 text-charcoal/60">
            <p>Versand in 2-4 Werktagen aus dem Valoir Studio.</p>
            <p>Geschenkverpackung ist für jede 50 ml und 100 ml Größe verfügbar.</p>
          </div>
        </motion.aside>
      </section>

      <section className="section-space border-y border-gold/20 bg-pearl/40">
        <div className="lux-container grid gap-16 lg:grid-cols-[0.88fr_1.12fr]">
          <MotionSection slow>
            <p className="eyebrow">Duftcharakter</p>
            <h2 className="section-title mt-6">{isSolar ? 'Warme Frucht. Weiche Haut.' : 'Dunkle Frucht. Ruhige Tiefe.'}</h2>
          </MotionSection>
          <MotionSection slow>
            <p className="text-2xl leading-10 text-charcoal/70">{product.story}</p>
            <p className="body-lux mt-8">{product.campaign}</p>
          </MotionSection>
        </div>
      </section>

      <section className="section-space lux-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.95fr]">
          <MotionSection slow>
            <p className="eyebrow">Duftpyramide</p>
            <h2 className="mb-12 mt-6 font-serif text-[clamp(3.6rem,6.5vw,7.5rem)] font-semibold leading-[0.88] text-charcoal">
              Drei Bewegungen, eine Signatur.
            </h2>
            <ScentPyramid product={product} refined />
          </MotionSection>
          <MotionSection className="grid gap-14 lg:pt-24" slow>
            <div>
              <h3 className="font-serif text-5xl leading-none text-charcoal">Wirkung</h3>
              <div className="mt-8">
                <PerformanceBars product={product} />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-5xl leading-none text-charcoal">Wann tragen</h3>
              <div className="mt-7 flex flex-wrap gap-3">
                {product.whenToWear.map((occasion) => (
                  <span key={occasion} className="border-t border-gold/20 px-1 py-3 text-sm uppercase tracking-nav text-charcoal/60">
                    {occasion}
                  </span>
                ))}
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="lux-container pb-32">
        <MotionSection className="grid gap-4 lg:grid-cols-3" slow>
          {[
            ['Versand & Rückgabe', 'Kostenfreier Versand ab 100 €. Versiegelte Düfte können innerhalb von 14 Tagen nach Zustellung zurückgegeben werden.'],
            ['Inhaltsstoffe', product.ingredients],
            ['Pflege', 'Vor direkter Hitze und Sonnenlicht schützen. Auf Pulspunkte sprühen und den Duft ohne Reiben setzen lassen.'],
          ].map(([title, text]) => (
            <div key={title} className="min-h-[260px] rounded-[1.8rem] bg-pearl/70 px-7 py-9 shadow-[0_20px_80px_rgba(68,46,24,0.08)] sm:px-9">
              <h3 className="text-[0.68rem] font-semibold uppercase tracking-luxury text-gold">{title}</h3>
              <p className="mt-6 text-sm leading-7 text-charcoal/60">{text}</p>
            </div>
          ))}
        </MotionSection>
      </section>
    </>
  );
}
