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
  title: 'Valoir Parfum | Dark cherry. Golden heat.',
  description: 'Valoir Parfum presents Noir Cerice and Luna Solea, two fragrance atmospheres built in shadow and amber light.',
  metadataBase: new URL('https://benknehler.github.io/valoir-parfum/'),
  icons: {
    icon: assetPath('/favicon.png'),
    shortcut: assetPath('/favicon.ico'),
  },
  openGraph: {
    title: 'Valoir Parfum',
    description: 'Dark cherry. Golden heat. A signature that stays.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
