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
  const isDtcExperience =
    pathname === '/neu' ||
    pathname === '/kollektion' ||
    pathname === '/ueber-uns' ||
    pathname.startsWith('/produkt/');

  return (
    <CartProvider>
      <PageLoader />
      {!isDtcExperience && <Header />}
      <CartDrawer />
      <AnimatePresence mode="wait">
        <motion.main key={pathname} className="page-shell" {...pageTransition}>
          {children}
        </motion.main>
      </AnimatePresence>
      {!isDtcExperience && <Footer />}
    </CartProvider>
  );
}
