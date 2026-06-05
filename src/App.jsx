import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Newsletter from './pages/Newsletter.jsx';
import NotFound from './pages/NotFound.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ueber-uns" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/produkt/:slug" element={<ProductDetail />} />
          <Route path="/warenkorb" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
