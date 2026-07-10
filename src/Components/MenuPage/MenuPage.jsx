import { useState, useEffect, useMemo } from "react";
import pizzaData from "../Pizzas/Pizza.json";
import burgerData from "../Burgers/Burger.json";
import friesData from "../Fries/Fries.json";
import dessertData from "../Desserts/Dessert.json";
import { useCart } from "../../context/useCart";
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
