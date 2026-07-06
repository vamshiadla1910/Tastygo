import React from 'react';
import "../OurSpecials/OurSpecials.css"
function OurSpecials() {
  const specials = [
    { name: 'Truffle Burst Pizza', tag: 'Chef\'s Recommended', price: '₹18.99', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
    { name: 'Smoky Flame Burger', tag: 'Limited Time', price: '₹14.99', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Velvet Chocolate Cake', tag: 'Best Seller', price: '₹9.99', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
    { name: 'Mint Citrus Mojito', tag: 'Cool Choice', price: '₹6.49', img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=800&q=80' },
    { name: 'Family Combo Feast', tag: 'Value Pack', price: '₹29.99', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80' },
    { name: 'Loaded Fries Bowl', tag: 'Limited Time', price: '₹7.49', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <section className="section specials-section" id="specials">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Handpicked for You</p>
          <h2>Our Specials</h2>
        </div>
        <div className="specials-grid">
          {specials.map((item) => (
            <article className="specials-card" key={item.name}>
              <div className="special-badge">{item.tag}</div>
              <img src={item.img} alt={item.name} />
              <div className="card-body">
                <h3>{item.name}</h3>
                <p className="orange-text">{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurSpecials;
