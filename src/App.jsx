import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import MenuPage from "./Components/MenuPage/MenuPage";
import CartPage from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import MyOrders from "./Components/MyOrders/MyOrders";
import AboutUs from "./Components/About/AboutUs";
import Footer from "./Components/Footer/Footer";
import Service from "./Components/Services/Service";
import Loader from "./Components/Loader/Loader";

import { CartProvider } from "./context/CartContext";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Loading screen duration (3.5 seconds)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Service />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;