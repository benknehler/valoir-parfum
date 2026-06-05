import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section empty-cart">
      <p className="eyebrow">404</p>
      <h1>Diese Seite existiert nicht.</h1>
      <p>Die Valoir Kollektion wartet im Shop.</p>
      <Link className="button button-dark" to="/shop">
        Zum Shop
      </Link>
    </section>
  );
}
