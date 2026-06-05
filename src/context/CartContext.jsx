import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'valoir-cart-v1';

function readStoredCart() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...item, product, lineTotal: product.price * item.quantity } : null;
        })
        .filter(Boolean),
    [items]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  function addToCart(productId, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item
        );
      }
      return [...current, { id: productId, quantity: Math.min(quantity, 10) }];
    });
  }

  function updateQuantity(productId, quantity) {
    const nextQuantity = Number(quantity);
    setItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, Math.min(nextQuantity, 10)) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart muss innerhalb von CartProvider verwendet werden.');
  }
  return context;
}
