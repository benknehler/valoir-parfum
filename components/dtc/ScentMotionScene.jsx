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

function IngredientVisual({ type, label, className = '' }) {
  const commonGlow = 'absolute inset-2 rounded-full blur-xl opacity-55';

  return (
    <div className={`relative h-24 w-24 ${className}`} aria-hidden="true" title={label}>
      {type === 'cherry' && (
        <>
          <div className={`${commonGlow} bg-cherry`} />
          <svg className="relative h-full w-full drop-shadow-[0_22px_30px_rgba(0,0,0,0.42)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="cherryFruit" cx="38%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#ffced2" />
                <stop offset="18%" stopColor="#b6172f" />
                <stop offset="70%" stopColor="#55000d" />
                <stop offset="100%" stopColor="#170608" />
              </radialGradient>
              <linearGradient id="cherryStem" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d6bd86" />
                <stop offset="100%" stopColor="#3d2022" />
              </linearGradient>
            </defs>
            <path d="M58 37c6-20 21-29 38-30" fill="none" stroke="url(#cherryStem)" strokeWidth="4" strokeLinecap="round" />
            <path d="M59 40c-3-18 3-29 19-37" fill="none" stroke="url(#cherryStem)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="43" cy="67" r="30" fill="url(#cherryFruit)" />
            <circle cx="76" cy="69" r="27" fill="url(#cherryFruit)" />
            <ellipse cx="34" cy="54" rx="8" ry="14" fill="#fff5ed" opacity="0.42" transform="rotate(32 34 54)" />
            <ellipse cx="68" cy="56" rx="6" ry="11" fill="#fff5ed" opacity="0.34" transform="rotate(24 68 56)" />
          </svg>
        </>
      )}

      {type === 'raspberry' && (
        <>
          <div className={`${commonGlow} bg-[#9f1832]`} />
          <svg className="relative h-full w-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.38)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="raspberryCell" cx="34%" cy="24%" r="76%">
                <stop offset="0%" stopColor="#ffd0d7" />
                <stop offset="18%" stopColor="#b91f3f" />
                <stop offset="100%" stopColor="#3a050e" />
              </radialGradient>
            </defs>
            {[
              [58, 27, 14],
              [41, 42, 16],
              [62, 45, 17],
              [81, 43, 15],
              [35, 64, 15],
              [55, 67, 18],
              [77, 65, 17],
              [48, 88, 13],
              [69, 88, 14],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#raspberryCell)" />
            ))}
            <path d="M51 28c-4-9 3-17 14-19 2 10-2 18-14 19Z" fill="#2b3b20" opacity="0.84" />
            <path d="M61 29c3-10 12-14 23-10-4 9-12 13-23 10Z" fill="#46562c" opacity="0.74" />
          </svg>
        </>
      )}

      {type === 'pepper' && (
        <div className="absolute inset-0">
          <div className="absolute inset-7 rounded-full bg-[radial-gradient(circle,rgba(255,218,172,0.9),rgba(154,24,42,0.36)_45%,transparent_72%)] blur-md" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((dot) => (
            <span
              key={dot}
              className="absolute h-3 w-3 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff5df,#cf7b70_44%,#6f1425)] shadow-[0_0_18px_rgba(214,189,134,0.5)]"
              style={{
                left: `${22 + ((dot * 19) % 54)}%`,
                top: `${20 + ((dot * 31) % 58)}%`,
              }}
            />
          ))}
        </div>
      )}

      {type === 'bergamot' && (
        <>
          <div className={`${commonGlow} bg-[#f2cc74]`} />
          <svg className="relative h-full w-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.34)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="bergamotSkin" cx="35%" cy="25%" r="74%">
                <stop offset="0%" stopColor="#fff8c9" />
                <stop offset="44%" stopColor="#d8b449" />
                <stop offset="100%" stopColor="#55662c" />
              </radialGradient>
              <linearGradient id="bergamotCut" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff7d1" />
                <stop offset="100%" stopColor="#d6bd86" />
              </linearGradient>
            </defs>
            <circle cx="57" cy="60" r="34" fill="url(#bergamotSkin)" />
            <path d="M57 29a33 33 0 0 1 31 44L57 60Z" fill="url(#bergamotCut)" opacity="0.9" />
            <path d="M57 60 89 58M57 60 79 38M57 60 86 74" stroke="#fff7da" strokeWidth="2" opacity="0.55" />
            <circle cx="43" cy="46" r="5" fill="#fff8d9" opacity="0.45" />
          </svg>
        </>
      )}

      {type === 'rose' && (
        <>
          <div className={`${commonGlow} bg-[#781423]`} />
          <svg className="relative h-full w-full drop-shadow-[0_22px_30px_rgba(0,0,0,0.44)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="rosePetal" cx="44%" cy="28%" r="78%">
                <stop offset="0%" stopColor="#e8a4aa" />
                <stop offset="38%" stopColor="#711326" />
                <stop offset="100%" stopColor="#180507" />
              </radialGradient>
            </defs>
            {[
              'M62 21c20 13 22 33 7 42-20-4-27-23-7-42Z',
              'M43 28c24 2 34 18 24 34-20 6-36-8-24-34Z',
              'M82 42c10 20 2 36-17 38-13-14-7-34 17-38Z',
              'M35 56c16-18 36-15 43 2-9 18-31 21-43-2Z',
              'M55 78c18-9 34-2 35 15-17 11-34 7-35-15Z',
            ].map((d) => (
              <path key={d} d={d} fill="url(#rosePetal)" opacity="0.94" />
            ))}
            <circle cx="61" cy="59" r="13" fill="#4b0c16" opacity="0.92" />
            <path d="M58 49c13 5 14 16 3 22-11-5-13-16-3-22Z" fill="#9f1832" />
          </svg>
        </>
      )}

      {type === 'plum' && (
        <>
          <div className={`${commonGlow} bg-[#5a132b]`} />
          <svg className="relative h-full w-full drop-shadow-[0_22px_30px_rgba(0,0,0,0.42)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="plumFruit" cx="32%" cy="24%" r="78%">
                <stop offset="0%" stopColor="#e6a1b2" />
                <stop offset="32%" stopColor="#711a3c" />
                <stop offset="100%" stopColor="#190711" />
              </radialGradient>
            </defs>
            <ellipse cx="62" cy="63" rx="34" ry="40" fill="url(#plumFruit)" transform="rotate(13 62 63)" />
            <path d="M66 25c-7 19-6 53 7 74" fill="none" stroke="#fff1ec" strokeWidth="2" opacity="0.24" />
            <ellipse cx="47" cy="43" rx="8" ry="14" fill="#fff3ef" opacity="0.28" transform="rotate(34 47 43)" />
          </svg>
        </>
      )}

      {type === 'jasmine' && (
        <>
          <div className={`${commonGlow} bg-[#fff7df] opacity-35`} />
          <svg className="relative h-full w-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.32)]" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="jasminePetal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fffdf7" />
                <stop offset="100%" stopColor="#d6bd86" />
              </linearGradient>
            </defs>
            {[0, 72, 144, 216, 288].map((rotation) => (
              <ellipse
                key={rotation}
                cx="60"
                cy="35"
                rx="12"
                ry="28"
                fill="url(#jasminePetal)"
                opacity="0.92"
                transform={`rotate(${rotation} 60 60)`}
              />
            ))}
            <circle cx="60" cy="60" r="9" fill="#c49b42" />
            <circle cx="60" cy="60" r="4" fill="#fff4d6" opacity="0.78" />
          </svg>
        </>
      )}

      {type === 'patchouli' && (
        <>
          <div className={`${commonGlow} bg-[#2b251a]`} />
          <svg className="relative h-full w-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.42)]" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="patchouliLeaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9b8b5c" />
                <stop offset="45%" stopColor="#37401d" />
                <stop offset="100%" stopColor="#12120b" />
              </linearGradient>
            </defs>
            <path d="M26 76c14-42 42-54 68-43-4 36-31 56-68 43Z" fill="url(#patchouliLeaf)" />
            <path d="M38 69c19-16 34-25 52-31" fill="none" stroke="#d6bd86" strokeWidth="2" opacity="0.38" />
            <path d="M51 59c-1-13 6-24 19-31 9 18 4 34-16 44Z" fill="url(#patchouliLeaf)" opacity="0.82" />
          </svg>
        </>
      )}

      {type === 'ebony' && (
        <>
          <div className={`${commonGlow} bg-black`} />
          <svg className="relative h-full w-full drop-shadow-[0_24px_34px_rgba(0,0,0,0.54)]" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ebonyWood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5a4034" />
                <stop offset="32%" stopColor="#160f0c" />
                <stop offset="100%" stopColor="#020202" />
              </linearGradient>
            </defs>
            <path d="M35 19h46l12 78H24Z" fill="url(#ebonyWood)" />
            <path d="M43 26c-3 18 1 48-8 64M59 24c8 25-1 43 7 70M76 28c-10 19-3 39-12 61" fill="none" stroke="#b9975b" strokeWidth="1.5" opacity="0.24" />
            <path d="M39 22h36" stroke="#fff8ef" strokeWidth="2" opacity="0.18" />
          </svg>
        </>
      )}

      {type === 'vanilla' && (
        <>
          <div className={`${commonGlow} bg-[#d6bd86] opacity-45`} />
          <svg className="relative h-full w-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.34)]" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="vanillaPod" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e6d1a6" />
                <stop offset="44%" stopColor="#5b3125" />
                <stop offset="100%" stopColor="#1b0d0a" />
              </linearGradient>
            </defs>
            <path d="M47 14c20 20 22 61-6 91 7-34 4-61 6-91Z" fill="url(#vanillaPod)" />
            <path d="M70 19c16 24 12 58-15 86 10-34 9-60 15-86Z" fill="url(#vanillaPod)" opacity="0.9" />
            <path d="M49 22c7 23 3 46-3 70M70 27c4 22 0 43-10 64" fill="none" stroke="#fff5d8" strokeWidth="1.4" opacity="0.25" />
          </svg>
        </>
      )}

      {type === 'amber' && (
        <>
          <div className={`${commonGlow} bg-amber`} />
          <svg className="relative h-full w-full drop-shadow-[0_20px_32px_rgba(0,0,0,0.34)]" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="amberResin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff0b9" />
                <stop offset="42%" stopColor="#bd7a2f" />
                <stop offset="100%" stopColor="#5b2109" />
              </linearGradient>
            </defs>
            <path d="M61 14 95 41 84 92 35 104 18 53Z" fill="url(#amberResin)" />
            <path d="M61 14 58 65 95 41M58 65 84 92M58 65 35 104M58 65 18 53" fill="none" stroke="#fff6d6" strokeWidth="2" opacity="0.27" />
            <path d="M49 34c12-10 26-8 34 2" stroke="#fff7db" strokeWidth="3" opacity="0.28" />
          </svg>
        </>
      )}

      {type === 'musk' && (
        <>
          <div className={`${commonGlow} bg-[#f4dfc0] opacity-35`} />
          <svg className="relative h-full w-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.28)]" viewBox="0 0 120 120">
            <defs>
              <radialGradient id="muskOrb" cx="35%" cy="28%" r="68%">
                <stop offset="0%" stopColor="#fffdf8" />
                <stop offset="46%" stopColor="#d8c6ad" />
                <stop offset="100%" stopColor="#7b6b62" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="31" fill="url(#muskOrb)" opacity="0.84" />
            <circle cx="60" cy="60" r="43" fill="none" stroke="#fffdf8" strokeWidth="1.5" opacity="0.24" />
            <path d="M28 66c17 10 45 10 64-5" fill="none" stroke="#fffdf8" strokeWidth="2" opacity="0.22" />
          </svg>
        </>
      )}

      {type === 'smoke' && (
        <svg className="relative h-full w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.38)]" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="smokeLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6bd86" stopOpacity="0.12" />
              <stop offset="48%" stopColor="#fff3dd" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#7b1f2b" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M48 103c-19-20 20-27 3-50-11-15 8-25 18-38" fill="none" stroke="url(#smokeLine)" strokeWidth="8" strokeLinecap="round" />
          <path d="M72 104c19-21-20-28-2-53 10-15-5-24-8-36" fill="none" stroke="url(#smokeLine)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
          <path d="M60 103c-4-24 30-31 15-55" fill="none" stroke="#fff8ef" strokeWidth="2" strokeLinecap="round" opacity="0.24" />
        </svg>
      )}
    </div>
  );
}

function IngredientCluster({ items, className = '', style }) {
  return (
    <motion.div className={`pointer-events-none absolute hidden lg:block ${className}`} style={style} aria-hidden="true">
      {items.map((item) => (
        <IngredientVisual key={item.type} {...item} />
      ))}
    </motion.div>
  );
}

function MobileVisualRow({ items }) {
  return (
    <div className="flex flex-wrap gap-3" aria-hidden="true">
      {items.map((item) => (
        <IngredientVisual key={item.type} {...item} className="h-16 w-16" />
      ))}
    </div>
  );
}

function MobilePhase({ label, notes, visuals = [], children, delay = 0 }) {
  return (
    <motion.div
      className="grid gap-5 border-t border-champagne/18 pt-8"
      initial={{ opacity: 0, y: 32, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.38 }}
      transition={{ duration: 0.9, delay, ease: luxuryEase }}
    >
      <PhaseLabel>{label}</PhaseLabel>
      <MobileVisualRow items={visuals} />
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
  const topLeftVisuals = [
    { type: 'cherry', label: 'Schwarzkirsche', className: 'absolute left-0 top-4 h-36 w-36' },
    { type: 'raspberry', label: 'Himbeere', className: 'absolute left-28 top-20 h-28 w-28 opacity-95' },
  ];
  const topRightVisuals = [
    { type: 'pepper', label: 'Rosa Pfeffer', className: 'absolute left-4 top-8 h-28 w-28' },
    { type: 'bergamot', label: 'Bergamotte', className: 'absolute left-28 top-2 h-24 w-24 opacity-90' },
  ];
  const heartLeftVisuals = [
    { type: 'rose', label: 'Schwarze Rose', className: 'absolute left-4 top-0 h-32 w-32' },
    { type: 'plum', label: 'Pflaume', className: 'absolute left-28 top-24 h-28 w-28 opacity-95' },
    { type: 'jasmine', label: 'Jasmin Sambac', className: 'absolute left-48 top-8 h-24 w-24 opacity-90' },
  ];
  const heartRightVisuals = [
    { type: 'patchouli', label: 'Gereinigtes Patchouli Herz', className: 'absolute left-6 top-10 h-32 w-32 opacity-95' },
  ];
  const baseLeftVisuals = [
    { type: 'ebony', label: 'Schwarzes Ebenholz', className: 'absolute left-0 top-2 h-32 w-32' },
    { type: 'vanilla', label: 'Vanille-Absolue', className: 'absolute left-24 top-20 h-28 w-28 opacity-95' },
    { type: 'amber', label: 'Ambra', className: 'absolute left-48 top-4 h-28 w-28 opacity-90' },
  ];
  const baseRightVisuals = [
    { type: 'musk', label: 'Moschus', className: 'absolute left-6 top-2 h-28 w-28 opacity-90' },
    { type: 'smoke', label: 'Rauchharz', className: 'absolute left-32 top-12 h-32 w-32 opacity-95' },
  ];

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

              <IngredientCluster
                className="left-[24%] top-[27%] z-20 h-56 w-80"
                items={topLeftVisuals}
                style={topLeftStyle}
              />
              <IngredientCluster
                className="right-[24%] top-[26%] z-20 h-48 w-72"
                items={topRightVisuals}
                style={topRightStyle}
              />
              <IngredientCluster
                className="left-[22%] top-[52%] z-20 h-56 w-96"
                items={heartLeftVisuals}
                style={heartLeftStyle}
              />
              <IngredientCluster
                className="right-[26%] top-[52%] z-20 h-48 w-64"
                items={heartRightVisuals}
                style={heartRightStyle}
              />
              <IngredientCluster
                className="left-[22%] bottom-[18%] z-20 h-52 w-[26rem]"
                items={baseLeftVisuals}
                style={baseLeftStyle}
              />
              <IngredientCluster
                className="right-[24%] bottom-[19%] z-20 h-52 w-72"
                items={baseRightVisuals}
                style={baseRightStyle}
              />

              <motion.div
                className="absolute left-[11%] top-[22%] z-20 hidden max-w-[20rem] lg:grid"
                style={topLeftStyle}
              >
                <PhaseStack title="Kopfnote" notes={topNotes.slice(0, 2)} />
              </motion.div>
              <motion.div
                className="absolute right-[8%] top-[24%] z-20 hidden max-w-[20rem] justify-items-start lg:grid"
                style={topRightStyle}
              >
                <PhaseStack title="Lichtakzent" notes={topNotes.slice(2)} />
              </motion.div>
              <motion.div
                className="absolute left-[7%] top-[54%] z-20 hidden max-w-[22rem] lg:grid"
                style={heartLeftStyle}
              >
                <PhaseStack title="Herznote" notes={heartNotes.slice(0, 3)} />
              </motion.div>
              <motion.div
                className="absolute right-[7%] top-[50%] z-20 hidden max-w-[24rem] lg:grid"
                style={heartRightStyle}
              >
                <PhaseStack title="Tiefe" notes={heartNotes.slice(3)} />
              </motion.div>
              <motion.div
                className="absolute left-[7%] bottom-[9%] z-20 hidden max-w-[23rem] lg:grid"
                style={baseLeftStyle}
              >
                <PhaseStack title="Basisnote" notes={baseNotes.slice(0, 3)} />
              </motion.div>
              <motion.div
                className="absolute right-[7%] bottom-[9%] z-20 hidden max-w-[24rem] lg:grid"
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
              <MobilePhase label="Kopfnote" notes={topNotes} visuals={[...topLeftVisuals, ...topRightVisuals]} delay={0.02}>
                Schwarzkirsche und Himbeere ziehen mit rotem Licht zur Mitte; rosa Pfeffer prickelt fein, Bergamotte bleibt ein kurzer heller Reflex.
              </MobilePhase>
              <MobilePhase label="Herznote" notes={heartNotes} visuals={[...heartLeftVisuals, ...heartRightVisuals]} delay={0.04}>
                Schwarze Rose, Pflaume und Jasmin öffnen die florale Tiefe. Patchouli legt eine dunkle, ruhige Welle darunter.
              </MobilePhase>
              <MobilePhase label="Basisnote" notes={baseNotes} visuals={[...baseLeftVisuals, ...baseRightVisuals]} delay={0.06}>
                Ebenholz, Vanille, Ambra, Moschus und Rauchharz verdichten sich zur warmen Spur um den Flakon.
              </MobilePhase>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
