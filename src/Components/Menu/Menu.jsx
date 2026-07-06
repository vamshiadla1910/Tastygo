import React from 'react';
import { useState } from 'react';
import { allMenuItems, menuCategories } from "./menuData";

function Menu() {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleItems = activeFilter === 'All' ? allMenuItems : allMenuItems.filter((item) => item.category === activeFilter);

  const filters = ['All', ...menuCategories];

  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Explore Our Menu</p>
          <h2>What&apos;s on the Menu?</h2>
        </div>

        <div className="filter-row">
          {filters.map((filter) => (
            <button key={filter} className={`pill ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        <div className="menu-grid-wrap">
          <div className="slider-arrows side-arrows">
            <button className="arrow-btn" aria-label="Previous menu item"></button>
            <button className="arrow-btn" aria-label="Next menu item"></button>
          </div>

          <div className="menu-grid">
            {visibleItems.map((item) => (
              <article className="menu-card" key={item.name}>
                <img src={item.img} alt={item.name} />
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p className="muted">{item.desc}</p>
                  <div className="menu-card-footer">
                    <strong>{item.price}</strong>
                    <button className="plus-btn" aria-label={`Add ${item.name}`}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
