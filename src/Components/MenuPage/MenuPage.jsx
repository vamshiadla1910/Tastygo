import { useState, useEffect, useMemo } from "react";
import pizzaData from "../Pizzas/Pizza.json";
import burgerData from "../Burgers/Burger.json";
import friesData from "../Fries/Fries.json";
import dessertData from "../Desserts/Dessert.json";
import { useCart } from "../../context/useCart";
import { FaUtensils, FaPizzaSlice, FaFire, FaClock, FaStar, FaLeaf, FaPepperHot } from 'react-icons/fa';
import "./MenuPage.css";

// Every item in the 4 JSON files is tagged with its category, and its
// price is normalized to a single "₹xx" string (Pizza/Fries/Dessert
// store price as a number, Burger already stores it as "₹xx").
const tagCategory = (items, category) =>
  items.map((item) => ({
    ...item,
    category,
    displayPrice:
      typeof item.price === "number" ? `₹${item.price}` : item.price,
  }));

const CATEGORY_DATA = {
  Pizzas: tagCategory(pizzaData, "Pizzas"),
  Burgers: tagCategory(burgerData, "Burgers"),
  Fries: tagCategory(friesData, "Fries"),
  Desserts: tagCategory(dessertData, "Desserts"),
};

const CATEGORIES = Object.keys(CATEGORY_DATA);

function MenuPage() {
  const { addToCart } = useCart();

  // "All" is the default view; clicking a category button switches to
  // that category's full list.
  const [activeCategory, setActiveCategory] = useState("All");

  // useMemo re-computes the visible list only when activeCategory changes,
  // instead of re-filtering on every render.
  const visibleItems = useMemo(() => {
    if (activeCategory === "All") {
      // "5 all types of cards" -> take the first 5 items from every
      // category and show them together as a quick preview.
      return CATEGORIES.flatMap((cat) => CATEGORY_DATA[cat].slice(0, 5));
    }
    return CATEGORY_DATA[activeCategory];
  }, [activeCategory]);

  // Scroll back to the top of the grid whenever the category changes,
  // so switching from a long list (e.g. Pizzas) to a short one doesn't
  // leave the user stranded halfway down the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  return (
    <section className="menu-page">
      <div className="menu-page-heading">
        <p className="menu-eyebrow">Full Menu</p>
        <h1>Pick Your Craving</h1>
      </div>

      <div className="menu-category-row">
        <button
          className={`menu-cat-btn ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => setActiveCategory("All")}
        >
          All
        </button>

        {/* Buttons are generated with .map so adding a new category later
            only means adding it to CATEGORY_DATA — no new JSX needed. */}
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`menu-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-page-grid">
        {visibleItems.map((item, index) => (
          <article
            className="menu-page-card"
            key={`${item.category}-${item.id ?? index}`}
          >
            <img src={item.image} alt={item.name} className="menu-page-img" />
            <div className="menu-page-info">
              <span className="menu-page-tag">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="menu-page-desc">{item.description}</p>
              {/* Food Details: render only when fields exist on the item */}
              {(item.serves || item.pieces || item.calories || item.prepTime || item.rating || item.type || item.spice) && (
                <div className="food-details" aria-hidden={false}>
                  {item.serves && <div className="food-detail"><FaUtensils className="icon"/> <span>Serves: {item.serves}</span></div>}
                  {item.pieces && <div className="food-detail"><FaPizzaSlice className="icon"/> <span>Pieces: {item.pieces}</span></div>}
                  {item.calories && <div className="food-detail"><FaFire className="icon"/> <span>Calories: {item.calories}</span></div>}
                  {item.prepTime && <div className="food-detail"><FaClock className="icon"/> <span>Prep Time: {item.prepTime}</span></div>}
                  {item.rating && <div className="food-detail"><FaStar className="icon"/> <span>Rating: {item.rating}</span></div>}
                  {item.type && <div className="food-detail"><FaLeaf className="icon"/> <span>Type: {item.type}</span></div>}
                  {item.spice && <div className="food-detail"><FaPepperHot className="icon"/> <span>Spice: {item.spice}</span></div>}
                </div>
              )}
              <div className="menu-page-footer">
                <strong>{item.displayPrice}</strong>
                <button
                  className="menu-page-add"
                  aria-label={`Add ${item.name} to cart`}
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MenuPage;
