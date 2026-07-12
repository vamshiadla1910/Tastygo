import React, { useState } from 'react';
import "../OurSpecials/OurSpecials.css";
import { useCart } from "../../context/useCart";

function OurSpecials() {
  const specials = [
    { name: 'Truffle Burst Pizza', tag: "Chef's Recommended", price: '₹188.99', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
    { name: 'Smoky Flame Burger', tag: 'Limited Time', price: '₹149.99', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Velvet Chocolate Cake', tag: 'Best Seller', price: '₹199.99', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
    { name: 'Mint Citrus Mojito', tag: 'Cool Choice', price: '₹68.49', img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=800&q=80' },
    { name: 'Family Combo Feast', tag: 'Value Pack', price: '₹299.99', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80' },
    { name: 'Loaded Fries Bowl', tag: 'Limited Time', price: '₹78.49', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80' }
  ];
  const { addToCart } = useCart();

  return (
    <section className="section specials-section" id="specials">
      <div className="special-container">
        <div className="section-heading center">
          <p className="eyebrow">Handpicked for You</p>
          <h2>Our Specials</h2>
        </div>
        <div className="specials-grid">
          {specials.map((item) => (
            <FlipCard key={item.name} item={item} addToCart={addToCart}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ item,addToCart }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className={`specials-card ${flipped ? "flipped" : ""}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className="special-badge">{item.tag}</div>
          <img src={item.img} alt={item.name} />
          <div className="card-body">
            <div className="body-top">
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
            </div>
            <div className="body-bottom">
              <button className='special-button' onClick={() => setFlipped(true)}>View Details</button>
              <button
                className="cart-add"
                aria-label={`Add ${item.name} to cart`}
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back">
          <img src={item.img} alt={item.name} />
          <h3>{item.name}</h3>
          <p>Special: {item.tag}</p>
          <p>Price: {item.price}</p>
          <p>Delicious choice handpicked for you!</p>
          <button className='go-back' onClick={() => setFlipped(false)}>Back</button>

        </div>
      </div>
    </section>
  );
}

export default OurSpecials;
