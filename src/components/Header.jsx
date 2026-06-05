import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/valoir-logo.jpg';
import { useCart } from '../context/CartContext.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/shop', label: 'Shop' },
  { to: '/newsletter', label: 'Newsletter' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Valoir Parfum Startseite">
        <img src={logo} alt="Valoir Parfum Logo" />
        <span>Valoir</span>
      </Link>

      <nav className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Hauptnavigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <NavLink className="cart-link" to="/warenkorb" aria-label={`Warenkorb mit ${cartCount} Artikeln`}>
          <ShoppingBag size={21} aria-hidden="true" />
          <span>{cartCount}</span>
        </NavLink>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
