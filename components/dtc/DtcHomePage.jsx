'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Gift, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { useRef, useState } from 'react';
import { dtcFaq, dtcProfiles, dtcServices } from '../../lib/dtcContent.js';
import { subscribeNewsletter } from '../../lib/newsletter/subscribe.ts';
import { luxuryEase } from '../../lib/motion.js';
import { products } from '../../lib/products.js';
import DtcLayout from './DtcLayout.jsx';
import DtcProductScene from './DtcProductScene.jsx';

const serviceIcons = [Truck, Gift, ShieldCheck, RotateCcw];

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 1.08, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}

function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      await subscribeNewsletter(email, 'dtc_home');
      setMessage('Bitte bestätige deine Anmeldung über die E-Mail von Valoir.');
      setEmail('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Die Anmeldung konnte nicht gespeichert werden.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="newsletter" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="lux-container">
        <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,rgba(255,253,248,0.92),rgba(241,230,213,0.62))] px-6 py-14 shadow-[0_28px_110px_rgba(68,46,24,0.1)] backdrop-blur-2xl sm:px-12 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(214,189,134,0.32),transparent_20rem),radial-gradient(circle_at_90%_96%,rgba(123,31,43,0.08),transparent_24rem)]" />
          <div className="relative">
            <p className="eyebrow mb-6">Newsletter</p>
            <h2 className="font-serif text-[clamp(3.1rem,7vw,6.9rem)] font-semibold leading-[0.9] text-charcoal">
              Der private Kreis.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-charcoal/68">
              Erhalte 10 % auf deine erste Valoir-Bestellung und exklusiven Zugang zu neuen Duftkompositionen.
            </p>
            <form className="mt-12 grid gap-5 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="dtc-newsletter-email">
                E-Mail-Adresse
              </label>
              <input
                id="dtc-newsletter-email"
                className="lux-input"
                type="email"
                value={email}
                required
                placeholder="E-Mail-Adresse"
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="button-lux button-lux-primary min-w-[12rem]" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Speichern...' : 'Rabatt sichern'}
              </button>
            </form>
            {message && <p className="mt-5 text-sm leading-6 text-charcoal/62">{message}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="lux-container">
        <Reveal className="grid gap-px overflow-hidden rounded-[1.8rem] bg-gold/18 md:grid-cols-4">
          {dtcServices.map(([title, text], index) => {
            const Icon = serviceIcons[index];
            return (
              <div key={title} className="min-h-52 bg-pearl/78 p-7 backdrop-blur-xl sm:p-9">
                <Icon size={20} strokeWidth={1.4} className="mb-10 text-gold" aria-hidden="true" />
                <h3 className="font-serif text-2xl leading-tight text-charcoal">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-charcoal/58">{text}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function CampaignVideoSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(123,31,43,0.1),transparent_28rem),radial-gradient(circle_at_82%_28%,rgba(214,189,134,0.34),transparent_30rem),linear-gradient(180deg,#fbf7ef,#fffdf8)]" />
      <div className="lux-container relative grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-6">Valoir Film</p>
          <h2 className="font-serif text-[clamp(3.5rem,7vw,7.6rem)] font-semibold leading-[0.9] text-charcoal">
            Zwei Signaturen in Bewegung.
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-9 text-charcoal/66">
            Ein kurzer Kampagnenfilm verbindet rotes Glas, goldenes Licht und die stille Präsenz der beiden Valoir-Düfte.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[2.6rem] border border-gold/14 bg-pearl/62 p-3 shadow-[0_34px_130px_rgba(68,46,24,0.14)]">
            <video
              className="aspect-video w-full rounded-[2.1rem] object-cover"
              src="/videos/valoir-campaign.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
              aria-label="Valoir Werbevideo mit Noir Cerice und Luna Solea"
            />
            <div className="pointer-events-none absolute inset-3 rounded-[2.1rem] bg-[linear-gradient(105deg,rgba(255,255,255,0.16),transparent_42%,rgba(214,189,134,0.16)_64%,transparent_82%)] mix-blend-screen" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="lux-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="eyebrow mb-6">Kundenvertrauen</p>
          <h2 className="font-serif text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.92] text-charcoal">
            Stimmen zur Duftwelt.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-8 text-charcoal/66">
            Antworten zu Versand, Rückgabe, Geschenkverpackung und Newsletter.
          </p>
        </Reveal>
        <Reveal className="rounded-[2rem] bg-pearl/62 p-6 shadow-[0_24px_90px_rgba(68,46,24,0.08)] backdrop-blur-2xl sm:p-10">
          <h3 className="mb-8 font-serif text-4xl text-charcoal">Fragen zur Bestellung</h3>
          <div className="divide-y divide-gold/18">
            {dtcFaq.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-semibold uppercase tracking-nav text-charcoal">
                  {question}
                  <span className="text-xl font-light text-gold transition-transform duration-500 ease-luxury group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/62">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function DtcHomePage() {
  const heroRef = useRef(null);
  const worldRef = useRef(null);
  const noir = products.find((product) => product.slug === 'noir-cerice');
  const luna = products.find((product) => product.slug === 'luna-solea');
  const { scrollYProgress: worldProgress } = useScroll({
    target: worldRef,
    offset: ['start end', 'end start'],
  });

  const worldNoirX = useTransform(worldProgress, [0, 1], [-28, 18]);
  const worldLunaX = useTransform(worldProgress, [0, 1], [32, -22]);

  return (
    <DtcLayout>
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-ivory">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/valoir-hero-scene.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.72)_0%,rgba(255,253,248,0.34)_42%,rgba(255,253,248,0.04)_70%),linear-gradient(180deg,rgba(255,253,248,0.12),rgba(239,226,209,0.16))]" />
        <div className="absolute inset-x-0 bottom-0 h-[24vh] bg-[radial-gradient(ellipse_at_center,rgba(255,253,248,0.64),transparent_70%)]" />
        <motion.div
          className="absolute bottom-[5%] right-[4%] hidden h-[44vh] w-[36vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,189,134,0.32),transparent_66%)] blur-3xl lg:block"
          animate={{ scale: [1, 1.08, 1], opacity: [0.34, 0.58, 0.34] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: luxuryEase }}
        />
        <motion.div
          className="absolute bottom-[3%] left-[-10%] hidden h-[30vh] w-[44vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,31,43,0.14),transparent_68%)] blur-3xl lg:block"
          animate={{ x: [0, 28, 0], opacity: [0.3, 0.52, 0.3] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: luxuryEase }}
        />

        <div className="lux-container relative flex min-h-[100svh] items-center pb-16 pt-28 lg:pt-36">
          <motion.div
            className="relative z-10 max-w-[46rem]"
            initial={{ opacity: 0, y: 46, filter: 'blur(24px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.18, ease: luxuryEase }}
          >
            <h1 className="font-serif text-[clamp(6.2rem,17vw,16rem)] font-semibold leading-[0.72] tracking-normal text-[#b6986f]">
              Valoir
            </h1>
            <p className="mt-8 max-w-xl text-2xl leading-9 text-charcoal/66 sm:text-3xl sm:leading-[1.18]">
              Zwei Duftwelten. Eine unverwechselbare Präsenz.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                className="group inline-flex min-h-[3.8rem] items-center justify-between gap-10 border border-[#b6986f]/42 bg-ivory/38 px-8 text-[0.72rem] font-semibold uppercase tracking-luxury text-[#9d825e] backdrop-blur-xl transition-all duration-500 ease-luxury hover:border-[#9d825e]/70 hover:bg-ivory/62"
                href="/kollektion"
              >
                Kollektion entdecken
                <ArrowRight size={18} className="transition-transform duration-500 ease-luxury group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CampaignVideoSection />

      <section id="duftwelten" ref={worldRef} className="relative overflow-hidden py-24 sm:py-36 lg:py-44">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f1e6d5_0%,#fffdf8_48%,#fbf7ef_100%)]" />
        <div className="lux-container relative">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="eyebrow mb-6">Duftwelten</p>
            <h2 className="font-serif text-[clamp(3.8rem,8vw,9.2rem)] font-semibold leading-[0.85] text-charcoal">
              Zwei Düfte. Ein Statement.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <motion.article
              className="relative min-h-[42rem] overflow-hidden rounded-[3rem] bg-[linear-gradient(145deg,#fffdf8_0%,#f4e9dc_52%,#ede0d0_100%)] p-7 sm:p-10"
              style={{ x: worldNoirX }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(123,31,43,0.22),transparent_28rem),linear-gradient(180deg,transparent,rgba(123,31,43,0.05))]" />
              <DtcProductScene product={noir} className="absolute inset-x-7 top-10 h-[25rem] rounded-[2.4rem] sm:h-[29rem]" />
              <div className="absolute inset-x-7 bottom-8 sm:inset-x-10 sm:bottom-10">
                <p className="eyebrow mb-4 text-cherry">Noir Cerice</p>
                <p className="max-w-md font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
                  {dtcProfiles[noir.slug].landingLine}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {noir.accords.map((accord) => (
                    <span key={accord} className="rounded-full bg-pearl/72 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/62">
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
            <motion.article
              className="relative min-h-[42rem] overflow-hidden rounded-[3rem] bg-[linear-gradient(145deg,#fffaf0_0%,#f1dfc2_54%,#fffdf8_100%)] p-7 sm:p-10"
              style={{ x: worldLunaX }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(189,122,47,0.24),transparent_28rem),linear-gradient(180deg,transparent,rgba(189,122,47,0.06))]" />
              <DtcProductScene product={luna} className="absolute inset-x-7 top-10 h-[25rem] rounded-[2.4rem] sm:h-[29rem]" />
              <div className="absolute inset-x-7 bottom-8 sm:inset-x-10 sm:bottom-10">
                <p className="eyebrow mb-4 text-amber">Luna Solea</p>
                <p className="max-w-md font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
                  {dtcProfiles[luna.slug].landingLine}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {luna.accords.map((accord) => (
                    <span key={accord} className="rounded-full bg-pearl/72 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-nav text-charcoal/62">
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>

          <Reveal className="mt-14 text-center">
            <Link className="button-lux button-lux-primary" href="/kollektion">
              Kollektion ansehen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-36 lg:py-44">
        <div className="lux-container grid gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <p className="eyebrow mb-6">Maison</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[0.9] text-charcoal">
              Duftkunst für bleibende Präsenz.
            </h2>
            <p className="mt-9 max-w-2xl text-xl leading-9 text-charcoal/66">
              Valoir komponiert Düfte, die nicht laut wirken müssen. Jede Komposition verbindet sinnliche Tiefe, moderne Eleganz und eine klare Duftsignatur.
            </p>
            <Link className="button-lux mt-12" href="/ueber-uns">
              Über Valoir <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative min-h-[34rem] overflow-hidden rounded-[3rem] bg-[linear-gradient(145deg,#fffdf8,#f1e6d5)] shadow-[0_30px_110px_rgba(68,46,24,0.1)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,189,134,0.32),transparent_21rem),radial-gradient(circle_at_78%_68%,rgba(123,31,43,0.1),transparent_22rem)]" />
              <div className="absolute left-[13%] top-[18%] h-[62%] w-[2px] rotate-12 bg-gradient-to-b from-transparent via-gold/40 to-transparent blur-[1px]" />
              <div className="absolute right-[24%] top-[8%] h-[76%] w-[2px] -rotate-12 bg-gradient-to-b from-transparent via-amber/28 to-transparent blur-[1px]" />
              <div className="absolute inset-x-[12%] bottom-[12%] h-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(65,44,24,0.14),transparent_66%)] blur-2xl" />
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceSection />
      <FaqSection />
      <NewsletterBlock />
    </DtcLayout>
  );
}
