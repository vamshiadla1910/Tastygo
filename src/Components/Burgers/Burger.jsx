import burgers from "./Burger.json";
import "./Burger.css";

function BurgerMenu() {
  return (
    <section className="burger-section">
      <h2 className="burger-title">Burgers</h2>

      <div className="menu-grid">
        {burgers.map((item, index) => (
          <div className="burger-card" key={item.id || index}>
            <img src={item.image} alt={item.name} className="burger-img" />
            <div className="burger-info">
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p className="desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BurgerMenu;