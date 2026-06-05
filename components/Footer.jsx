import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '../lib/assets.js';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Maison' },
  { href: '/contact', label: 'Contact' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/returns', label: 'Returns' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/imprint', label: 'Imprint' },
];

const socials = ['Instagram', 'TikTok', 'Pinterest'];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030202] py-16 text-porcelain">
      <div className="lux-container">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_0.75fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="Valoir home">
              <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-champagne/30">
                <Image src={assetPath('/images/valoir-logo.jpg')} alt="Valoir Parfum" fill className="object-cover" />
              </span>
              <span className="font-serif text-3xl leading-none">Valoir</span>
            </Link>
            <p className="mt-7 max-w-md text-xl leading-8 text-cream/60">
              Fragrance composed in shadow, light and lasting presence.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-nav text-cream/50 transition-colors duration-500 hover:text-champagne"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="eyebrow">Social</p>
            <div className="mt-6 grid gap-4">
              {socials.map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-sm uppercase tracking-nav text-cream/50 transition-colors duration-500 hover:text-champagne"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="hairline" />
          <div className="mt-6 flex flex-col justify-between gap-4 text-xs uppercase tracking-nav text-cream/40 md:flex-row">
            <span>© 2026 Valoir Parfum</span>
            <span>Dark cherry. Golden heat.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
