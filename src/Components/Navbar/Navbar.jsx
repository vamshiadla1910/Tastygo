import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../../assets/Logo.png";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Loginpage from "../Login/Login";
import { useCart } from "../../context/useCart";
import "../../Components/Navbar/Navbar.css";
import { useTheme } from "../../context/TheameContext.jsx";


const NAV_LINKS = [
  { name: "Home", type: "route", path: "/" },
  { name: "Menu", type: "route", path: "/menu" },
  { name: "My Orders", type: "route", path: "/my-orders" },
  { name: "Specials", type: "scroll", id: "specials" },
  { name: "About", type: "route", path: "/about" },
  { name: "Services", type: "route", path: "/service" },
];
 
function Navbar() {

  const { theme, toggleTheme } = useTheme();
  // Controls whether the login overlay is visible
  

  // cartCount comes from the shared CartContext, so it updates the
  // instant addToCart() is called from MenuPage, even though MenuPage
  // and Navbar are separate components.
  const { cartCount } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prevCartCount = useRef(cartCount);
 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setIsCartBumping(true);
      const timer = setTimeout(() => setIsCartBumping(false), 500);
      prevCartCount.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? "hidden" : "auto";
 
    const handleEscKey = (event) => {
      if (event.key === "Escape") setIsLoginOpen(false);
    };

    window.addEventListener("keydown", handleEscKey);
 
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isLoginOpen]);
 
  const handleNavClick = (link) => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);

    if (link.type === "route") {
      navigate(link.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: link.id } });
    } else {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={img} alt="Tastygo logo" />
      </div>

      <div className="links">
        {NAV_LINKS.map((link, index) => (
          <span
            key={link.name}
            className={index >= 3 ? "desktop-only-link" : ""}
            onClick={() => handleNavClick(link)}
          >
            {link.name}
          </span>
        ))}
      </div>
 
      <div className="cp">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
        
        <div
          className={`cart-icon-wrapper ${isCartBumping ? "cart-bump" : ""}`}
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        <FaUser
          className="icon"
          onClick={() => {
            setIsLoginOpen(true);
            setIsMobileMenuOpen(false);
          }}
        />

        <div
          className="icon menu-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="links mobile-links">
          {NAV_LINKS.slice(3).map((link) => (
            <span key={link.name} onClick={() => handleNavClick(link)}>
              {link.name}
            </span>
          ))}
        </div>
      )}

      {isLoginOpen && (
        <div
          className="login-overlay-backdrop"
          onClick={() => setIsLoginOpen(false)}
        >
          <div
            className="login-overlay-content"
            onClick={(event) => event.stopPropagation()}
          >
            <Loginpage onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Navbar;