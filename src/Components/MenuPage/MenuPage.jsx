import { useState, useEffect, useMemo } from "react";
import pizzaData from "../Pizzas/Pizza.json";
import burgerData from "../Burgers/Burger.json";
import friesData from "../Fries/Fries.json";
import dessertData from "../Desserts/Dessert.json";
import { useCart } from "../../context/useCart";
import { FaUtensils, FaPizzaSlice, FaFire, FaClock, FaStar, FaLeaf, FaPepperHot } from 'react-icons/fa';
import "./MenuPage.css";

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

  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") {
      return CATEGORIES.flatMap((cat) => CATEGORY_DATA[cat].slice(0, 5));
    }
    return CATEGORY_DATA[activeCategory];
  }, [activeCategory]);


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
            
              <span className="menu-page-tag">{item.category}</span>
              <div className="menu-page-info">
              <h3>{item.name}</h3>
              <p className="menu-page-desc">{item.description}</p>
              {/* Food Details: render only when fields exist on the item */}
              {(item.serves || item.pieces || item.calories || item.prepTime || item.rating || item.type || item.spice) && (
                <div className="food-details" aria-hidden={false}>
                  {item.serves && <div className="added-desc"><FaUtensils className="food-icon"/> <span>Serves: {item.serves}</span></div>}
                  {item.pieces && <div className="added-desc"><FaPizzaSlice className="food-icon"/> <span>Pieces: {item.pieces}</span></div>}
                  {item.calories && <div className="added-desc"><FaFire className="food-icon"/> <span>Calories: {item.calories}</span></div>}
                  {item.prepTime && <div className="added-desc"><FaClock className="food-icon"/> <span>Prep Time: {item.prepTime}</span></div>}
                  {item.rating && <div className="added-desc"><FaStar className="food-icon"/> <span>Rating: {item.rating}</span></div>}
                  {item.type && <div className="added-desc"><FaLeaf className="food-icon"/> <span>Type: {item.type}</span></div>}
                  {item.spice && <div className="added-desc"><FaPepperHot className="food-icon"/> <span>Spice: {item.spice}</span></div>}
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
