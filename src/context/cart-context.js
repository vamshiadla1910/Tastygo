import { createContext } from "react";

// The raw context object lives in its own file (separate from the
// CartProvider component) purely so Vite's Fast Refresh can reliably
// hot-reload CartContext.jsx while you're editing it.
export const CartContext = createContext(null);
