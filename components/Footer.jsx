import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '../lib/assets.js';

const links = [
  { href: '/shop', label: 'Kollektion' },
  { href: '/about', label: 'Über uns' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/shipping', label: 'Versand' },
  { href: '/returns', label: 'Rückgabe' },
  { href: '/privacy', label: 'Datenschutz' },
  { href: '/imprint', label: 'Impressum' },
];

const socials = ['Instagram', 'TikTok'];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-pearl/60 py-16 text-charcoal">
      <div className="lux-container">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_0.75fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="Valoir Startseite">
              <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-gold/30">
                <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum Logo" fill className="object-cover" />
              </span>
              <span className="font-serif text-3xl leading-none">Valoir</span>
            </Link>
            <p className="mt-7 max-w-md text-xl leading-8 text-charcoal/60">
              Zwei Duftwelten. Eine unverwechselbare Präsenz.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3" aria-label="Footer-Navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-nav text-charcoal/50 transition-colors duration-500 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="eyebrow">Kanäle</p>
            <div className="mt-6 grid gap-4">
              {socials.map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-sm uppercase tracking-nav text-charcoal/50 transition-colors duration-500 hover:text-gold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="hairline" />
          <div className="mt-6 flex flex-col justify-between gap-4 text-xs uppercase tracking-nav text-charcoal/40 md:flex-row">
            <span>© 2026 Valoir Parfum</span>
            <span>Noir Cerice / Luna Solea</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
