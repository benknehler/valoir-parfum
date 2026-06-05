'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSizePrice, products } from '../lib/products.js';

const CartContext = createContext(null);
const storageKey = 'valoir-luxury-cart-v2';
const discountStorageKey = 'valoir-luxury-discount-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setItems(JSON.parse(stored));
      const storedDiscount = window.localStorage.getItem(discountStorageKey);
      if (storedDiscount) setDiscount(JSON.parse(storedDiscount));
    } catch {
      setItems([]);
      setDiscount(null);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Local storage is an enhancement, not a checkout dependency.
    }
  }, [items]);

  useEffect(() => {
    try {
      if (discount) {
        window.localStorage.setItem(discountStorageKey, JSON.stringify(discount));
      } else {
        window.localStorage.removeItem(discountStorageKey);
      }
    } catch {
      // Local storage is an enhancement, not a checkout dependency.
    }
  }, [discount]);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          if (!product) return null;
          const unitPrice = getSizePrice(product, item.size);
          return { ...item, product, unitPrice, total: unitPrice * item.quantity };
        })
        .filter(Boolean),
    [items]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountTotal = Math.min(Number(discount?.discountTotal || 0), subtotal);
  const shippingCost = subtotal === 0 || subtotal >= 100 ? 0 : 4.9;
  const total = Math.max(subtotal + shippingCost - discountTotal, 0);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (items.length === 0 && discount) setDiscount(null);
  }, [discount, items.length]);

  function addToCart(productId, options = {}) {
    const quantity = options.quantity || 1;
    const size = options.size || '50 ml';

    setItems((current) => {
      const existing = current.find((item) => item.id === productId && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item
        );
      }
      return [...current, { id: productId, size, quantity: Math.min(quantity, 10) }];
    });
    setIsCartOpen(true);
  }

  function updateQuantity(productId, size, quantity) {
    const nextQuantity = Math.max(1, Math.min(Number(quantity) || 1, 10));
    setItems((current) =>
      current.map((item) =>
        item.id === productId && item.size === size ? { ...item, quantity: nextQuantity } : item
      )
    );
  }

  function removeItem(productId, size) {
    setItems((current) => current.filter((item) => !(item.id === productId && item.size === size)));
  }

  function clearCart() {
    setItems([]);
    setDiscount(null);
  }

  function applyDiscount(discountPayload) {
    setDiscount(discountPayload);
  }

  function clearDiscount() {
    setDiscount(null);
  }

  const value = {
    cartItems,
    subtotal,
    shippingCost,
    discount,
    discountTotal,
    total,
    count,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    applyDiscount,
    clearDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider.');
  return context;
}
