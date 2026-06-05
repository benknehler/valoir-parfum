'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantityControl({ value, onChange, label = 'Menge' }) {
  const numericValue = Number(value);

  return (
    <div
      className="inline-grid h-12 grid-cols-[42px_54px_42px] overflow-hidden rounded-full border border-charcoal/10 bg-pearl/60 text-charcoal"
      aria-label={label}
    >
      <button type="button" aria-label="Menge verringern" onClick={() => onChange(Math.max(1, numericValue - 1))}>
        <Minus size={15} aria-hidden="true" className="mx-auto" />
      </button>
      <input
        aria-label={label}
        className="w-full border-x border-charcoal/10 bg-transparent text-center text-sm text-charcoal outline-none"
        min="1"
        max="10"
        type="number"
        value={numericValue}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" aria-label="Menge erhöhen" onClick={() => onChange(Math.min(10, numericValue + 1))}>
        <Plus size={15} aria-hidden="true" className="mx-auto" />
      </button>
    </div>
  );
}
