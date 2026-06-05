import { CreditCard, Gem, ShieldCheck, Sparkles, Truck } from 'lucide-react';

const trustItems = [
  { icon: Sparkles, label: 'Premium Duftkomposition' },
  { icon: Truck, label: 'Versand in 2-4 Werktagen' },
  { icon: ShieldCheck, label: 'Sichere Zahlung' },
  { icon: Gem, label: 'Exklusive Parfum-DNA' },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Valoir Vorteile">
      {trustItems.map(({ icon: Icon, label }) => (
        <div key={label} className="trust-item">
          {Icon === ShieldCheck ? <CreditCard size={19} aria-hidden="true" /> : <Icon size={19} aria-hidden="true" />}
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
