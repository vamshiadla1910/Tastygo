import { useState, useCallback } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
  // Each entry: { key, id, name, category, image, displayPrice, quantity }
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    // Pizza/Burger/Fries/Dessert each restart their JSON "id" from 1, so
    // "id" alone isn't unique across the whole menu — combine it with
    // "category" to build a key that is.
    const key = `${product.category}-${product.id}`;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.key === key);

      if (existingItem) {
        // Already in the cart -> bump its quantity by 1
        return prevItems.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      // New product -> add it with quantity 1
      return [...prevItems, { ...product, key, quantity: 1 }];
    });
  }, []);

  const getItemPrice = (product) => {
    if (typeof product.price === "number") {
      return product.price;
    }
    return Number(String(product.price).replace(/[^\d.]/g, "")) || 0;
  };

  const increaseQuantity = useCallback((key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((key) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalItems = useCallback(() => cartCount, [cartCount]);

  const getTotalPrice = useCallback(
    () =>
      cartItems.reduce(
        (total, item) => total + getItemPrice(item) * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
