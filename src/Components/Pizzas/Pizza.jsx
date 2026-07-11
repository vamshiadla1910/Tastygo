import pizzas from "./Pizza.json";
import {
  FaUtensils,
  FaPizzaSlice,
  FaFire,
  FaClock,
  FaStar,
  FaLeaf,
  FaPepperHot,
} from "react-icons/fa";
import "./Pizza.css";

function PizzaMenu() {
  return (
    <section className="pizza-section">
      <h2 className="pizza-title">Pizzas</h2>

      <div className="menu-grid">
        {pizzas.map((item) => (
          <div className="pizza-card" key={item.id}>
            <img src={item.image} alt={item.name} className="pizza-img" />
            <div className="pizza-info">
              <h3>{item.name}</h3>
              <p className="desc">{item.description}</p>

              <div className="food-details">
                <div className="food-meta">
                  <FaUtensils className="icon" />
                  <span>{item.serves}</span>
                </div>

                <div className="food-meta">
                  <FaPizzaSlice className="icon" />
                  <span>{item.pieces}</span>
                </div>

                <div className="food-meta">
                  <FaClock className="icon" />
                  <span>{item.prepTime}</span>
                </div>

                <div className="food-meta">
                  <FaLeaf className="icon" />
                  <span>{item.type}</span>
                </div>
              </div>

              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PizzaMenu;
