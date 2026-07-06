import { useContext } from "react";
import { CartContext } from "./cart-context";

// Small custom hook so components just call useCart() instead of
// importing useContext + CartContext everywhere.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}
