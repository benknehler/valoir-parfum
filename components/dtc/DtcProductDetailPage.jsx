'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Gift, ShoppingBag, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { dtcProfiles } from '../../lib/dtcContent.js';
import { luxuryEase } from '../../lib/motion.js';
import { formatPrice, getSizePrice } from '../../lib/products.js';
import { useCart } from '../CartContext.jsx';
import QuantityControl from '../QuantityControl.jsx';
import DtcLayout from './DtcLayout.jsx';
import DtcProductScene from './DtcProductScene.jsx';

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 1.02, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}

function GalleryTile({ label, active, onClick, children }) {
  return (
    <button
      className={`relative min-h-[9rem] overflow-hidden rounded-[1.3rem] border text-left transition-all duration-500 ease-luxury ${
        active ? 'border-charcoal/28 bg-pearl' : 'border-gold/18 bg-pearl/42 hover:border-gold/54'
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
      <span className="absolute bottom-3 left-4 text-[0.62rem] font-semibold uppercase tracking-nav text-charcoal/52">
        {label}
      </span>
    </button>
  );
}

function DetailAtmosphere({ product, type }) {
  const isSolar = product.world === 'solar';
  const label = type === 'packaging' ? 'Geschenkbox' : 'Auf Haut';

  return (
    <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[2.4rem] bg-pearl/68 shadow-[0_28px_100px_rgba(68,46,24,0.1)]">
      <div
        className={`absolute inset-0 ${
          isSolar
            ? 'bg-[radial-gradient(circle_at_52%_22%,rgba(214,189,134,0.38),transparent_25rem),linear-gradient(145deg,#fffdf8,#f0dfc8)]'
            : 'bg-[radial-gradient(circle_at_44%_24%,rgba(123,31,43,0.16),transparent_25rem),linear-gradient(145deg,#fffdf8,#eee1d3)]'
        }`}
      />
      <div className="absolute inset-x-[16%] bottom-[18%] h-[22%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.13),transparent_66%)] blur-2xl" />
      <div className="absolute left-[24%] top-[12%] h-[70%] w-px rotate-12 bg-gradient-to-b from-transparent via-gold/44 to-transparent blur-[1px]" />
      <div className="absolute right-[22%] top-[18%] h-[60%] w-px -rotate-12 bg-gradient-to-b from-transparent via-charcoal/18 to-transparent blur-[1px]" />
      <div className="absolute bottom-8 left-8">
        <p className="eyebrow mb-3">{label}</p>
        <p className="max-w-xs font-serif text-4xl leading-tight text-charcoal">
          {type === 'packaging' ? 'Reduziert verpackt. Bereit zum Verschenken.' : 'Eine Signatur, die nahe bleibt.'}
        </p>
      </div>
    </div>
  );
}

function ProductGallery({ product }) {
  const [active, setActive] = useState('main');
  const gallery = {
    main: <DtcProductScene product={product} priority className="h-full min-h-[40rem] rounded-[2.6rem]" imageClassName="scale-[1.05]" />,
    detail: <DtcProductScene product={product} className="h-full min-h-[40rem] rounded-[2.6rem]" imageClassName="scale-[1.18]" />,
    packaging: <DetailAtmosphere product={product} type="packaging" />,
    lifestyle: <DetailAtmosphere product={product} type="lifestyle" />,
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[6.8rem_1fr]">
      <div className="order-2 grid grid-cols-4 gap-3 lg:order-1 lg:grid-cols-1">
        {[
          ['main', 'Hauptbild'],
          ['detail', 'Flakon'],
          ['packaging', 'Geschenkbox'],
          ['lifestyle', 'Auf Haut'],
        ].map(([key, label]) => (
          <GalleryTile key={key} label={label} active={active === key} onClick={() => setActive(key)}>
            {key === 'main' || key === 'detail' ? (
              <DtcProductScene product={product} className="absolute inset-0 rounded-[1.1rem]" imageClassName="scale-[1.2]" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(214,189,134,0.28),transparent_7rem),linear-gradient(145deg,#fffdf8,#f1e6d5)]" />
            )}
          </GalleryTile>
        ))}
      </div>
      <motion.div
        key={active}
        className="order-1 overflow-hidden rounded-[2.6rem] lg:order-2"
        initial={{ opacity: 0, filter: 'blur(14px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.72, ease: luxuryEase }}
      >
        {gallery[active]}
      </motion.div>
    </div>
  );
}

function BuyPanel({ product }) {
  const [size, setSize] = useState(product.sizes[0].label);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const profile = dtcProfiles[product.slug];
  const price = useMemo(() => getSizePrice(product, size), [product, size]);

  function handleAddToCart() {
    addToCart(product.id, { size, quantity: Number(quantity) || 1 });
  }

  return (
    <aside className="sticky top-32 rounded-[2.2rem] bg-pearl/72 p-6 shadow-[0_28px_100px_rgba(68,46,24,0.09)] backdrop-blur-2xl sm:p-9">
      <p className={`eyebrow mb-5 ${product.world === 'solar' ? 'text-amber' : 'text-cherry'}`}>{product.collection}</p>
      <h1 className="font-serif text-[clamp(3.7rem,7vw,7rem)] font-semibold leading-[0.82] text-charcoal">
        {product.name}
      </h1>
      <p className="mt-7 text-lg leading-8 text-charcoal/62">{profile.atmosphere}</p>
      <p className="mt-8 text-2xl text-charcoal">{formatPrice(price)}</p>

      <div className="mt-10">
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/46">Größe</p>
        <div className="grid grid-cols-2 gap-3">
          {product.sizes.map((entry) => (
            <button
              key={entry.label}
              className={`h-[3.25rem] rounded-full border px-5 text-sm transition-all duration-500 ease-luxury ${
                size === entry.label
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-gold/24 bg-pearl/42 text-charcoal/64 hover:border-gold/70'
              }`}
              type="button"
              onClick={() => setSize(entry.label)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/46">Menge</p>
        <QuantityControl value={quantity} onChange={setQuantity} />
      </div>

      <div className="mt-10 grid gap-3">
        <button className="button-lux button-lux-primary w-full" type="button" onClick={handleAddToCart}>
          In den Warenkorb <ShoppingBag size={15} aria-hidden="true" />
        </button>
        <button className="button-lux w-full" type="button" onClick={handleAddToCart}>
          Jetzt kaufen
        </button>
      </div>

      <div className="mt-9 grid gap-4 border-t border-gold/18 pt-7 text-sm leading-6 text-charcoal/62">
        <p className="flex items-center gap-3">
          <Truck size={16} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
          Versand in 2-4 Werktagen
        </p>
        <p className="flex items-center gap-3">
          <Gift size={16} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
          Geschenkverpackung verfügbar
        </p>
      </div>
    </aside>
  );
}

function ScentPyramid({ profile }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {Object.entries(profile.notes).map(([level, notes], index) => (
        <div key={level} className="relative overflow-hidden rounded-[1.8rem] bg-pearl/70 p-7 shadow-[0_22px_80px_rgba(68,46,24,0.07)]">
          <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-gold/42 to-transparent" />
          <p className="eyebrow mb-6">{level}</p>
          <div className="flex flex-wrap gap-3">
            {notes.map((note) => (
              <span key={note} className="rounded-full bg-linen/54 px-4 py-2 text-sm leading-6 text-charcoal/66">
                {note}
              </span>
            ))}
          </div>
          <div
            className="mt-9 h-px bg-gradient-to-r from-gold/50 to-transparent"
            style={{ width: `${100 - index * 18}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function ScentProfile({ profile }) {
  return (
    <div className="grid gap-7">
      {Object.entries(profile.profile).map(([label, value]) => (
        <div key={label}>
          <div className="mb-3 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/48">
            <span>{label}</span>
            <span>{value}/100</span>
          </div>
          <div className="h-px bg-gold/18">
            <motion.div
              className="h-px bg-charcoal"
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1.1, ease: luxuryEase }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DtcProductDetailPage({ product }) {
  const profile = dtcProfiles[product.slug];

  return (
    <DtcLayout>
      <section className="relative overflow-hidden pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(214,189,134,0.28),transparent_30rem),radial-gradient(circle_at_84%_8%,rgba(189,122,47,0.1),transparent_28rem),linear-gradient(180deg,#fffdf8,#fbf7ef)]" />
        <div className="lux-container relative grid gap-12 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <ProductGallery product={product} />
          </Reveal>
          <Reveal delay={0.08}>
            <BuyPanel product={product} />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-40">
        <div className="lux-container grid gap-24">
          <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow mb-5">Duftbeschreibung</p>
              <h2 className="font-serif text-5xl leading-none text-charcoal sm:text-6xl">Die Signatur</h2>
            </div>
            <p className="max-w-4xl text-xl leading-10 text-charcoal/68">{profile.detailDescription}</p>
          </Reveal>

          <Reveal>
            <p className="eyebrow mb-8">Duftpyramide</p>
            <ScentPyramid profile={profile} />
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] bg-pearl/62 p-7 shadow-[0_24px_90px_rgba(68,46,24,0.07)] backdrop-blur-2xl sm:p-10">
              <p className="eyebrow mb-8">Duftprofil</p>
              <ScentProfile profile={profile} />
            </Reveal>
            <Reveal delay={0.08} className="rounded-[2rem] bg-pearl/62 p-7 shadow-[0_24px_90px_rgba(68,46,24,0.07)] backdrop-blur-2xl sm:p-10">
              <p className="eyebrow mb-8">Anlass</p>
              <div className="grid gap-4">
                {profile.occasions.map((occasion) => (
                  <p key={occasion} className="flex items-center gap-3 text-lg text-charcoal/68">
                    <Check size={16} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                    {occasion}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="grid gap-8 border-t border-gold/18 pt-14 lg:grid-cols-3">
            <div>
              <p className="eyebrow mb-5">Versand & Rückgabe</p>
              <p className="text-base leading-8 text-charcoal/62">
                Versand innerhalb von 2-4 Werktagen. Ungeöffnete und unbenutzte Düfte können innerhalb von 14 Tagen nach Zustellung zurückgegeben werden.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-5">Inhaltsstoffe</p>
              <p className="text-base leading-8 text-charcoal/62">{product.ingredients}</p>
            </div>
            <div>
              <p className="eyebrow mb-5">Service</p>
              <p className="text-base leading-8 text-charcoal/62">
                Geschenkverpackung ist für beide Größen vorgesehen. Die Kaufstrecke ist so angelegt, dass später Stripe, Shopify oder ein eigenes Backend angebunden werden kann.
              </p>
            </div>
          </Reveal>

          <Reveal className="text-center">
            <Link className="button-lux" href="/kollektion">
              Zurück zur Kollektion
            </Link>
          </Reveal>
        </div>
      </section>
    </DtcLayout>
  );
}
