import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Menge' }) {
  const current = Number(value);

  return (
    <div className="quantity-stepper" aria-label={label}>
      <button
        type="button"
        aria-label="Menge verringern"
        disabled={current <= min}
        onClick={() => onChange(Math.max(min, current - 1))}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <input
        aria-label={label}
        type="number"
        min={min}
        max={max}
        value={current}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="button"
        aria-label="Menge erhöhen"
        disabled={current >= max}
        onClick={() => onChange(Math.min(max, current + 1))}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
