import fries from "./Fries.json";
import "./Fries.css";

function FriesMenu() {
  return (
    <section className="fries-section">
      <h2 className="fries-title">Fries</h2>

      <div className="menu-grid">
        {fries.map((item, index) => (
          <div className="fries-card" key={item.id || index}>
            <img src={item.image} alt={item.name} className="fries-img" />
            <div className="fries-info">
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

export default FriesMenu;