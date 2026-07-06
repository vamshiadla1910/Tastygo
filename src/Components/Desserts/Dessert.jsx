import desserts from "./Dessert.json";
import "./Dessert.css";

function DessertMenu() {
  return (
    <section className="dessert-section">
      <h2 className="dessert-title">Desserts</h2>

      <div className="menu-grid">
        {desserts.map((item, index) => (
          <div className="dessert-card" key={item.id || index}>
            <img src={item.image} alt={item.name} className="dessert-img" />
            <div className="dessert-info">
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

export default DessertMenu;