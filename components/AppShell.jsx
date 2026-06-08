'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { CartProvider } from './CartContext.jsx';
import Header from './Header.jsx';
import CartDrawer from './CartDrawer.jsx';
import Footer from './Footer.jsx';
import PageLoader from './PageLoader.jsx';
import { pageTransition } from '../lib/motion.js';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const normalizedPathname = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  const isDtcExperience =
    normalizedPathname === '/' ||
    normalizedPathname === '/neu' ||
    normalizedPathname === '/kollektion' ||
    normalizedPathname === '/ueber-uns' ||
    normalizedPathname.startsWith('/produkt/');
  const isAdminExperience = normalizedPathname.startsWith('/admin') || normalizedPathname.startsWith('/konto');

  if (isAdminExperience) {
    return children;
  }

  return (
    <CartProvider>
      <PageLoader />
      {!isDtcExperience && <Header />}
      <CartDrawer />
      <AnimatePresence mode="wait">
        <motion.main key={normalizedPathname} className="page-shell" {...pageTransition}>
          {children}
        </motion.main>
      </AnimatePresence>
      {!isDtcExperience && <Footer />}
    </CartProvider>
  );
}
