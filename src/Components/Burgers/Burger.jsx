import burgers from "./Burger.json";
import {
  FaUtensils,
  FaHamburger,
  FaClock,
  FaLeaf
} from "react-icons/fa";
import "./Burger.css";

function BurgerMenu() {
  return (
    <section className="burger-section">
      <h2 className="burger-title">Burgers</h2>

      <div className="menu-grid">
        {burgers.map((item, index) => (
          <div className="burger-card" key={item.id || index}>
            <img
              src={item.image}
              alt={item.name}
              className="burger-img"
            />

            <div className="burger-info">
              <h3>{item.name}</h3>

              <p className="price">{item.price}</p>

              <p className="desc">{item.description}</p>

              <div className="food-details">
                <div className="food-detail">
                  <FaUtensils className="icon" />
                  <span>{item.serves}</span>
                </div>

                <div className="food-detail">
                  <FaHamburger className="icon" />
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

export default BurgerMenu;