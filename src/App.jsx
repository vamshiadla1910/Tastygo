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
import { CartProvider } from "./context/CartContext";
import Service from "./Components/Services/Service";

function App() {
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