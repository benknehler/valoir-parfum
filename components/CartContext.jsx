'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../lib/products.js';

const CartContext = createContext(null);
const storageKey = 'valoir-luxury-cart-v2';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Local storage is an enhancement, not a checkout dependency.
    }
  }, [items]);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...item, product, total: product.price * item.quantity } : null;
        })
        .filter(Boolean),
    [items]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const value = {
    cartItems,
    subtotal,
    count,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider.');
  return context;
}
