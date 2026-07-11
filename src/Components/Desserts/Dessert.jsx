import desserts from "./Dessert.json";
import {
  FaUtensils,
  FaClock,
  FaLeaf
} from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import "./Dessert.css";

function DessertMenu() {
  return (
    <section className="dessert-section">
      <h2 className="dessert-title">Desserts</h2>

      <div className="menu-grid">
        {desserts.map((item, index) => (
          <div className="dessert-card" key={item.id || index}>
            <img
              src={item.image}
              alt={item.name}
              className="dessert-img"
            />

            <div className="dessert-info">
              <h3>{item.name}</h3>

              <p className="price">₹{item.price}</p>

              <p className="desc">{item.description}</p>

              <div className="food-details">
                <div className="food-detail">
                  <FaUtensils className="icon" />
                  <span>{item.serves}</span>
                </div>

                <div className="food-detail">
                  <GiCakeSlice className="icon" />
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

export default DessertMenu;