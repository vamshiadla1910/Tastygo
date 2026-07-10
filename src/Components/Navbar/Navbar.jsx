import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../../assets/Logo.png";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import Loginpage from "../Login/Login";
import { useCart } from "../../context/useCart";
import "../../Components/Navbar/Navbar.css";
import { useTheme } from "../../context/TheameContext.jsx";


// A single source of truth for every nav item.
// type: "route"  -> its own page, navigated to with react-router (useNavigate)
// type: "scroll" -> a section that lives on the Home page ("/"); if we're
//                   already on Home we just scroll to it, otherwise we
//                   navigate Home first and then scroll (handled in Home.jsx)
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
  // Controls the short "bump" animation on the cart icon whenever an
  // item is added. useRef holds the previous count without causing a
  // re-render itself (unlike useState).
  const [isCartBumping, setIsCartBumping] = useState(false);
  const prevCartCount = useRef(cartCount);

  const navigate = useNavigate();
  const location = useLocation();

  // Fires whenever cartCount changes. If it went UP (an item was added,
  // not removed), briefly switch on the "bump" class, then switch it
  // back off after the animation's duration.
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setIsCartBumping(true);
      const timer = setTimeout(() => setIsCartBumping(false), 500);
      prevCartCount.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  // While the login overlay is open: lock background scrolling, and let
  // the user close it by pressing Escape. Both are cleaned up when the
  // overlay closes or the component unmounts.
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
    // Make sure the login overlay isn't left open on top of whatever
    // page we're about to navigate to.
    setIsLoginOpen(false);

    if (link.type === "route") {
      navigate(link.path);
      return;
    }

    // "scroll" link: if we're not on the Home page, go there first and
    // tell Home (via router state) which section to scroll to once it
    // has mounted. If we're already on Home, scroll immediately.
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
        {/* Rendered with .map so every link goes through the same
            navigation logic above — add a new link to NAV_LINKS and it
            just works, no extra JSX needed. */}
        {NAV_LINKS.map((link) => (
          <span key={link.name} onClick={() => handleNavClick(link)}>
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
        <FaUser className="icon" onClick={() => setIsLoginOpen(true)} />

        
      </div>

      
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