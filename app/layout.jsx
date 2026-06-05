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
  title: 'Valoir Parfum | Fragrance composed for the unforgettable.',
  description:
    'Valoir Parfum is a high-end fragrance commerce experience for modern, memorable scent DNA.',
  metadataBase: new URL('https://benknehler.github.io/valoir-parfum/'),
  icons: {
    icon: assetPath('/favicon.png'),
    shortcut: assetPath('/favicon.ico'),
  },
  openGraph: {
    title: 'Valoir Parfum',
    description: 'Fragrance composed for the unforgettable.',
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
