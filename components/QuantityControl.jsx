'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantityControl({ value, onChange, label = 'Quantity' }) {
  const numericValue = Number(value);

  return (
    <div className="inline-grid h-12 grid-cols-[42px_52px_42px] border border-white/10 bg-white/[0.035]" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, numericValue - 1))}>
        <Minus size={15} aria-hidden="true" className="mx-auto" />
      </button>
      <input
        aria-label={label}
        className="w-full border-x border-white/10 bg-transparent text-center text-sm text-porcelain outline-none"
        min="1"
        max="10"
        type="number"
        value={numericValue}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(10, numericValue + 1))}>
        <Plus size={15} aria-hidden="true" className="mx-auto" />
      </button>
    </div>
  );
}
