import React from 'react';
import "./Specialization.css";
function Specialization() {
  const cards = [
    { title: 'Professional Chefs', text: 'Experienced hands preparing every dish with care.', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80', icon: '👨‍🍳' },
    { title: 'Fresh Ingredients', text: 'We source ingredients daily for brighter flavor.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', icon: '🥬' },
    { title: 'Hygienic Kitchen', text: 'Clean, organized, and maintained with strict care.', img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80', icon: '🧼' },
    { title: 'Fast Delivery', text: 'Hot food delivered quickly to your doorstep.', img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80', icon: '🛵' }
  ];

  return (
    <section className="specialization-section" id="specialization">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Our Specialization</p>
          <h2>Why Choose Tastigo</h2>
        </div>
        <div className="special-grid">
          {cards.map((card) => (
            <article className="special-card" key={card.title}>
              <img src={card.img} alt={card.title} />
              <div className="special-body">
                <div className="special-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialization;
