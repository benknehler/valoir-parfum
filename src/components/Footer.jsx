import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <p className="eyebrow">Valoir Parfum</p>
          <h2>Duftkunst für moderne Rituale.</h2>
          <p>
            Sinnliche Kompositionen, klare Linien und eine Parfum-DNA, die zwischen Tiefe,
            Wärme und Individualität schwingt.
          </p>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>
          <Link to="/">Home</Link>
          <Link to="/ueber-uns">Über uns</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/warenkorb">Warenkorb</Link>
        </div>

        <div className="footer-links">
          <h3>Service</h3>
          <a href="#impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
          <a href="#versand">Versand</a>
          <a href="#retouren">Retouren</a>
        </div>

        <div className="footer-newsletter">
          <NewsletterSignup compact />
          <div className="social-links" aria-label="Social Media">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <Facebook size={18} aria-hidden="true" />
            </a>
            <a href="mailto:hello@valoir-parfum.example" aria-label="E-Mail">
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Valoir Parfum</span>
        <span>Dummy-Shop für spätere Checkout-Anbindung.</span>
      </div>
    </footer>
  );
}
