import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/valoir-logo.jpg';
import { products } from '../data/products.js';

const values = [
  {
    title: 'Eleganz',
    text: 'Reduzierte Formen, klare Sprache und Duftverläufe, die bewusst nachklingen.',
  },
  {
    title: 'Sinnlichkeit',
    text: 'Warme Basisnoten, taktile Texturen und Akkorde, die nah an der Haut arbeiten.',
  },
  {
    title: 'Exklusivität',
    text: 'Eine kleine Signature-Linie mit Fokus auf wiedererkennbare Parfum-DNA.',
  },
  {
    title: 'Moderne Duftkunst',
    text: 'Klassische Rohstoffbilder werden mit zeitgemäßer Klarheit und Tiefe verbunden.',
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="page-hero-copy" data-reveal>
          <p className="eyebrow">Über Valoir</p>
          <h1>Luxusmarke für sinnliche, moderne Duft-DNA.</h1>
          <p>
            Valoir Parfum steht für Eleganz, Tiefe und Individualität. Jeder Duft ist ein stilles
            Statement: präsent, aber nie schwerfällig.
          </p>
        </div>
        <div className="page-hero-image" data-reveal>
          <img src={logo} alt="Valoir Parfum Logo" />
        </div>
      </section>

      <section className="section story-section">
        <div className="story-image" data-reveal>
          <img src={products[0].image} alt="Noir Cerice Flakon im Valoir Storytelling" loading="lazy" />
        </div>
        <div className="story-copy" data-reveal>
          <p className="eyebrow">Die Story</p>
          <h2>Zwischen Licht, Schatten und persönlicher Signatur.</h2>
          <p>
            Valoir komponiert Düfte für Menschen, die Luxus als Haltung verstehen: leise,
            aufmerksam und unverwechselbar. Die Kollektion bewegt sich zwischen dunkler Frucht,
            floraler Spannung, cremiger Wärme und polierten Hölzern.
          </p>
          <p>
            Das Ergebnis ist eine moderne Duftgarderobe, die nicht überdeckt, sondern begleitet.
            Jede Komposition entfaltet sich über Stunden und lässt Raum für Individualität.
          </p>
          <Link to="/shop" className="button button-dark">
            <span>Kollektion ansehen</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section values-section">
        <div className="section-heading narrow" data-reveal>
          <p className="eyebrow">Markenwerte</p>
          <h2>Woraus Valoir gemacht ist.</h2>
        </div>
        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title} data-reveal>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
