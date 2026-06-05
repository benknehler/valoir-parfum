import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import AppShell from '../components/AppShell.jsx';
import { assetPath } from '../lib/assets.js';

const editorial = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-editorial',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Valoir Parfum | Zwei Duftwelten. Eine Präsenz.',
  description: 'Valoir Parfum präsentiert Noir Cerice und Luna Solea, zwei moderne Duftwelten in dunkler Kirsche und goldener Wärme.',
  metadataBase: new URL('https://benknehler.github.io/valoir-parfum/'),
  icons: {
    icon: assetPath('/favicon.png'),
    shortcut: assetPath('/favicon.ico'),
  },
  openGraph: {
    title: 'Valoir Parfum',
    description: 'Zwei Duftwelten. Eine unverwechselbare Präsenz.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
