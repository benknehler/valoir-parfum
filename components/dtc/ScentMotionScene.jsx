'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { luxuryEase } from '../../lib/motion.js';

function PhaseLabel({ children }) {
  return (
    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-luxury text-champagne/72">
      {children}
    </p>
  );
}

function NoteText({ children }) {
  return (
    <span className="group flex items-center gap-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/76">
      <span className="h-px w-8 bg-gradient-to-r from-champagne/12 via-champagne/58 to-transparent" aria-hidden="true" />
      {children}
    </span>
  );
}

function PhaseStack({ title, notes, className = '', style }) {
  return (
    <motion.div className={`grid gap-4 ${className}`} style={style}>
      <PhaseLabel>{title}</PhaseLabel>
      <div className="grid gap-3">
        {notes.map((note) => (
          <NoteText key={note}>{note}</NoteText>
        ))}
      </div>
    </motion.div>
  );
}

function MobilePhase({ label, notes, children, delay = 0 }) {
  return (
    <motion.div
      className="grid gap-5 border-t border-champagne/18 pt-8"
      initial={{ opacity: 0, y: 32, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.38 }}
      transition={{ duration: 0.9, delay, ease: luxuryEase }}
    >
      <PhaseLabel>{label}</PhaseLabel>
      <p className="max-w-xl text-base leading-8 text-ivory/68">{children}</p>
      <div className="grid gap-3">
        {notes.map((note) => (
          <NoteText key={note}>{note}</NoteText>
        ))}
      </div>
    </motion.div>
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
  const sceneRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [88, -78]);
  const headingOpacity = useTransform(scrollYProgress, [0.03, 0.16, 0.78, 0.94], [0, 1, 1, 0.64]);
  const headingY = useTransform(scrollYProgress, [0.03, 0.2], [36, 0]);
  const headingBlur = useTransform(scrollYProgress, [0.03, 0.18], ['blur(18px)', 'blur(0px)']);

  const topOpacity = useTransform(scrollYProgress, [0.12, 0.24, 0.62, 0.9], [0, 1, 0.82, 0.34]);
  const topLeftX = useTransform(scrollYProgress, [0.12, 0.64, 0.94], [-130, -22, 24]);
  const topRightX = useTransform(scrollYProgress, [0.12, 0.64, 0.94], [130, 22, -24]);
  const topY = useTransform(scrollYProgress, [0.12, 0.78], [22, -8]);
  const topBlur = useTransform(scrollYProgress, [0.12, 0.25], ['blur(16px)', 'blur(0px)']);

  const heartOpacity = useTransform(scrollYProgress, [0.28, 0.42, 0.76, 0.96], [0, 1, 0.92, 0.46]);
  const heartLeftX = useTransform(scrollYProgress, [0.28, 0.78, 0.96], [-110, -10, 18]);
  const heartRightX = useTransform(scrollYProgress, [0.28, 0.78, 0.96], [110, 10, -18]);
  const heartY = useTransform(scrollYProgress, [0.28, 0.78], [24, -12]);
  const heartBlur = useTransform(scrollYProgress, [0.28, 0.44], ['blur(18px)', 'blur(0px)']);

  const baseOpacity = useTransform(scrollYProgress, [0.48, 0.62, 0.98], [0, 1, 0.82]);
  const baseLeftX = useTransform(scrollYProgress, [0.48, 0.92], [-84, 18]);
  const baseRightX = useTransform(scrollYProgress, [0.48, 0.92], [84, -18]);
  const baseY = useTransform(scrollYProgress, [0.48, 0.92], [46, -16]);
  const baseBlur = useTransform(scrollYProgress, [0.48, 0.64], ['blur(20px)', 'blur(0px)']);

  const coreOpacity = useTransform(scrollYProgress, [0.46, 0.72, 1], [0, 1, 0.96]);
  const coreScale = useTransform(scrollYProgress, [0.46, 0.92], [0.72, 1.08]);
  const auraScale = useTransform(scrollYProgress, [0.38, 0.95], [0.86, 1.22]);
  const bottleOpacity = useTransform(scrollYProgress, [0.58, 0.76, 1], [0, 1, 1]);
  const bottleY = useTransform(scrollYProgress, [0.52, 0.92], [54, -12]);
  const bottleScale = useTransform(scrollYProgress, [0.52, 0.9], [0.9, 1.02]);
  const reflectionOpacity = useTransform(scrollYProgress, [0.6, 0.86], [0, 0.52]);
  const smokeY = useTransform(scrollYProgress, [0.3, 1], [42, -34]);
  const smokeOpacity = useTransform(scrollYProgress, [0.3, 0.68, 1], [0, 0.72, 0.56]);

  const staticStyle = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
  const headingStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: headingOpacity, y: headingY, filter: headingBlur };
  const topLeftStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: topOpacity, x: topLeftX, y: topY, filter: topBlur };
  const topRightStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: topOpacity, x: topRightX, y: topY, filter: topBlur };
  const heartLeftStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: heartOpacity, x: heartLeftX, y: heartY, filter: heartBlur };
  const heartRightStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: heartOpacity, x: heartRightX, y: heartY, filter: heartBlur };
  const baseLeftStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: baseOpacity, x: baseLeftX, y: baseY, filter: baseBlur };
  const baseRightStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: baseOpacity, x: baseRightX, y: baseY, filter: baseBlur };
  const coreStyle = shouldReduceMotion ? staticStyle : { opacity: coreOpacity, scale: coreScale };
  const auraStyle = shouldReduceMotion ? staticStyle : { opacity: coreOpacity, scale: auraScale };
  const bottleStyle = shouldReduceMotion
    ? staticStyle
    : { opacity: bottleOpacity, y: bottleY, scale: bottleScale };
  const smokeStyle = shouldReduceMotion
    ? { opacity: 0.5, y: 0 }
    : { opacity: smokeOpacity, y: smokeY };
  const sectionStyle = shouldReduceMotion ? { y: 0 } : { y: sectionY };

  const topNotes = notes?.Kopfnote || [];
  const heartNotes = notes?.Herznote || [];
  const baseNotes = notes?.Basisnote || [];
  const [themePrimary = 'bordeaux'] = visualTheme;

  return (
    <section
      ref={sceneRef}
      className={`relative isolate overflow-hidden bg-ink text-ivory ${tone === 'dark-cerise' ? '' : ''}`}
      aria-labelledby="noir-cerice-motion-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(123,31,43,0.36),transparent_28rem),radial-gradient(circle_at_24%_56%,rgba(121,20,34,0.24),transparent_30rem),radial-gradient(circle_at_78%_48%,rgba(185,151,91,0.18),transparent_24rem),linear-gradient(180deg,#16120f_0%,#241113_48%,#120d0b_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.32)_46%,transparent_54%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_100%,82px_82px]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ivory/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ivory/70 to-transparent" />

      <motion.div className="lux-container relative py-24 sm:py-32 lg:min-h-[188vh] lg:py-0" style={sectionStyle}>
        <div className="lg:sticky lg:top-20 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center">
          <div className="w-full">
            <motion.div className="mx-auto max-w-4xl text-center" style={headingStyle}>
              <p className="eyebrow mb-6 text-champagne/82">{productName}</p>
              <h2
                id="noir-cerice-motion-title"
                className="font-serif text-[clamp(3.5rem,8vw,8.7rem)] font-semibold leading-[0.88] text-ivory"
              >
                {headline}
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory/66 sm:text-xl sm:leading-9">
                {subline}
              </p>
            </motion.div>

            <div
              className="relative mx-auto mt-16 min-h-[45rem] max-w-[1320px] overflow-hidden rounded-[2.8rem] bg-[#160c0d]/58 sm:min-h-[52rem] lg:min-h-[min(760px,72svh)]"
              role="img"
              aria-label={`${productName}: Duftnoten bewegen sich zur fertigen Duftsignatur.`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,31,43,0.46)_0%,rgba(61,20,22,0.28)_30%,transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent_30%,rgba(0,0,0,0.34)_100%)]" />
              <div className="absolute inset-x-[8%] bottom-[13%] h-[24%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,235,210,0.34),rgba(123,31,43,0.18)_34%,transparent_70%)] blur-3xl" />
              <div className="absolute inset-x-[12%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-champagne/42 to-transparent" />

              <motion.div
                className="absolute left-[9%] top-[19%] hidden h-[18rem] w-[36rem] -rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(154,24,42,0.52),rgba(123,31,43,0.16)_38%,transparent_70%)] blur-2xl lg:block"
                style={topLeftStyle}
                aria-hidden="true"
              />
              <motion.div
                className="absolute right-[7%] top-[20%] hidden h-[16rem] w-[32rem] rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,20,34,0.38),rgba(255,255,255,0.08)_38%,transparent_72%)] blur-2xl lg:block"
                style={topRightStyle}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-[28%] top-[25%] h-[20rem] w-[44%] rounded-full border border-champagne/16 bg-[radial-gradient(ellipse_at_center,rgba(255,232,214,0.12),transparent_62%)] blur-[1px]"
                style={heartLeftStyle}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-[20%] bottom-[20%] h-[19rem] w-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,151,91,0.22),rgba(61,32,34,0.28)_44%,transparent_72%)] blur-2xl"
                style={baseLeftStyle}
                aria-hidden="true"
              />
              <motion.div
                className="absolute inset-x-[12%] bottom-[11%] h-[21rem] bg-[radial-gradient(ellipse_at_center,rgba(42,22,20,0.68),transparent_72%)] blur-3xl"
                style={smokeStyle}
                aria-hidden="true"
              />

              <motion.div
                className="absolute left-[14%] top-[22%] hidden max-w-[20rem] lg:grid"
                style={topLeftStyle}
              >
                <PhaseStack title="Kopfnote" notes={topNotes.slice(0, 2)} />
              </motion.div>
              <motion.div
                className="absolute right-[9%] top-[24%] hidden max-w-[20rem] justify-items-start lg:grid"
                style={topRightStyle}
              >
                <PhaseStack title="Lichtakzent" notes={topNotes.slice(2)} />
              </motion.div>
              <motion.div
                className="absolute left-[8%] top-[52%] hidden max-w-[22rem] lg:grid"
                style={heartLeftStyle}
              >
                <PhaseStack title="Herznote" notes={heartNotes.slice(0, 3)} />
              </motion.div>
              <motion.div
                className="absolute right-[8%] top-[50%] hidden max-w-[24rem] lg:grid"
                style={heartRightStyle}
              >
                <PhaseStack title="Tiefe" notes={heartNotes.slice(3)} />
              </motion.div>
              <motion.div
                className="absolute left-[10%] bottom-[10%] hidden max-w-[23rem] lg:grid"
                style={baseLeftStyle}
              >
                <PhaseStack title="Basisnote" notes={baseNotes.slice(0, 3)} />
              </motion.div>
              <motion.div
                className="absolute right-[10%] bottom-[10%] hidden max-w-[24rem] lg:grid"
                style={baseRightStyle}
              >
                <PhaseStack title="Nachhall" notes={baseNotes.slice(3)} />
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-[47%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,241,224,0.28),rgba(154,24,42,0.24)_30%,rgba(185,151,91,0.12)_52%,transparent_72%)] blur-2xl"
                style={auraStyle}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-1/2 top-[48%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/24 bg-[radial-gradient(circle_at_52%_42%,rgba(255,253,248,0.16),rgba(123,31,43,0.28)_38%,rgba(22,18,15,0.08)_68%)]"
                style={coreStyle}
                aria-hidden="true"
              />

              <motion.div className="absolute left-[44%] top-[18%] hidden lg:block" style={topRightStyle} aria-hidden="true">
                <div className="relative h-32 w-32">
                  {[0, 1, 2, 3, 4, 5, 6].map((dot) => (
                    <span
                      key={dot}
                      className="absolute h-1.5 w-1.5 rounded-full bg-champagne/70 shadow-[0_0_18px_rgba(214,189,134,0.62)]"
                      style={{
                        left: `${18 + dot * 10}%`,
                        top: `${18 + (dot % 3) * 20}%`,
                        opacity: 0.45 + dot * 0.06,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="absolute right-[30%] top-[25%] hidden h-px w-[16rem] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#ffe7b4]/78 to-transparent blur-[0.5px] lg:block"
                style={topRightStyle}
                aria-hidden="true"
              />

              <motion.div
                className="absolute inset-x-0 bottom-[12%] z-30 mx-auto h-[30rem] w-[min(20rem,58vw)] sm:h-[34rem] sm:w-[22rem] lg:h-[38rem] lg:w-[24rem]"
                style={bottleStyle}
              >
                <div className="absolute inset-x-[8%] bottom-0 h-[8rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,232,210,0.22),rgba(123,31,43,0.22)_34%,transparent_68%)] blur-2xl" />
                <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(104deg,rgba(255,255,255,0.16),transparent_28%,transparent_68%,rgba(255,255,255,0.1))] mix-blend-screen" />
                <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_36%,rgba(0,0,0,0.9)_58%,transparent_82%)]">
                  <Image
                    src={product.image}
                    alt={`${productName} Flakon als fertige Duftkomposition`}
                    fill
                    sizes="(min-width: 1024px) 24rem, 58vw"
                    className="object-cover object-[50%_45%] contrast-[1.05] saturate-[1.08]"
                  />
                </div>
                <motion.div
                  className="absolute inset-x-[18%] bottom-[-18%] h-[42%] scale-y-[-1] overflow-hidden opacity-40 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_76%)]"
                  style={{ opacity: shouldReduceMotion ? 0.34 : reflectionOpacity }}
                  aria-hidden="true"
                >
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="18rem"
                    className="object-cover object-[50%_45%] blur-[1px] saturate-[0.8]"
                  />
                </motion.div>
              </motion.div>

              <div className="absolute left-6 top-6 rounded-full border border-champagne/18 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-luxury text-champagne/74 sm:left-8 sm:top-8">
                {themePrimary}
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-10 lg:hidden">
              <MobilePhase label="Kopfnote" notes={topNotes} delay={0.02}>
                Schwarzkirsche und Himbeere ziehen mit rotem Licht zur Mitte; rosa Pfeffer prickelt fein, Bergamotte bleibt ein kurzer heller Reflex.
              </MobilePhase>
              <MobilePhase label="Herznote" notes={heartNotes} delay={0.04}>
                Schwarze Rose, Pflaume und Jasmin öffnen die florale Tiefe. Patchouli legt eine dunkle, ruhige Welle darunter.
              </MobilePhase>
              <MobilePhase label="Basisnote" notes={baseNotes} delay={0.06}>
                Ebenholz, Vanille, Ambra, Moschus und Rauchharz verdichten sich zur warmen Spur um den Flakon.
              </MobilePhase>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
