import fries from "./Fries.json";
import {
  FaUtensils,
  FaClock,
  FaLeaf
} from "react-icons/fa";
import { GiFrenchFries } from "react-icons/gi";
import "./Fries.css";

function FriesMenu() {
  return (
    <section className="fries-section">
      <h2 className="fries-title">Fries</h2>

      <div className="menu-grid">
        {fries.map((item, index) => (
          <div className="fries-card" key={item.id || index}>
            <img
              src={item.image}
              alt={item.name}
              className="fries-img"
            />

            <div className="fries-info">
              <h3>{item.name}</h3>

              <p className="price">₹{item.price}</p>

              <p className="desc">{item.description}</p>

              <div className="food-details">
                <div className="food-detail">
                  <FaUtensils className="icon" />
                  <span>{item.serves}</span>
                </div>

                <div className="food-detail">
                  <GiFrenchFries className="icon" />
                  <span>{item.pieces}</span>
                </div>

                <div className="food-detail">
                  <FaClock className="icon" />
                  <span>{item.prepTime}</span>
                </div>

                <div className="food-detail">
                  <FaLeaf className="icon" />
                  <span>{item.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FriesMenu;