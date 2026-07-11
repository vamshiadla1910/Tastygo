import React from 'react';
import { useState } from 'react';
import { allMenuItems, menuCategories } from "./menuData";
import { FaFire, FaClock, FaStar, FaLeaf, FaPepperHot, FaUtensils, FaPizzaSlice } from 'react-icons/fa';
import './Menu.css';

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

                  <div className="food-details" aria-hidden={false}>
                    <div className="food-detail"><FaUtensils className="icon"/> <span>{item.serves}</span></div>
                    <div className="food-detail"><FaPizzaSlice className="icon"/> <span>{item.pieces}</span></div>
                    <div className="food-detail"><FaFire className="icon"/> <span>{item.calories}</span></div>
                    <div className="food-detail"><FaClock className="icon"/> <span>{item.prepTime}</span></div>
                    <div className="food-detail"><FaStar className="icon"/> <span>{item.rating}</span></div>
                    <div className="food-detail"><FaPepperHot className="icon"/> <span>{item.spice}</span></div>
                    <div className="food-detail"><FaLeaf className="icon"/> <span>{item.type}</span></div>
                  </div>

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
