import pizzas from "./Pizza.json";
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
              <p className="price">₹{item.price}</p>
              <p className="desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PizzaMenu;