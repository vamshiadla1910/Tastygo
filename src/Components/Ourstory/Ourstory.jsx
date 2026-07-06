import React from "react";
import { Link } from "react-router-dom";
import "./Ourstory.css";
import burgerImg from "../../assets/image4.png"; 
import img from "../../assets/pizza.jpg"
import logo from "../../assets/Logo.png"
import fries from "../../assets/fries.jpg"
import dessert from "../../assets/dessert.jpg"

function OurStory() {
  return (
    <section className="section story-section" id="our-story">
      <div className="container about-grid">
        <div className="collage">
          <img
            className="img-large"
            src={dessert}
            alt="Dining room"
          />
          <img
            className="img-top"
            src={img}
            alt="Kitchen team"
          />
          <img
            className="img-bottom"
            src={fries}
            alt="Fresh pizza"
          />
          <div className="year-badge"><img src={logo} alt="" /></div>
        </div>

        <div className="about-content">
          <p className="eyebrow">Our Story</p>

          <div className="story-heading-wrap">
            <h2>Born from a Taste of Passion</h2>
            <img
              src={burgerImg}
              alt="Burger"
              className="corner-img bottom-left-img"
            />
          </div>

          <p className="section-text">
            Since 2018, Tastigo has been serving more than just food. We serve
            moments, memories, and a sense of community with every plate.
          </p>

          <div className="stats-grid">
            <div className="stat-box">
              <span>🏠</span>
              <strong>2018</strong>
              <p>Founded</p>
            </div>
            <div className="stat-box">
              <span>👥</span>
              <strong>20K+</strong>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <span>🍽️</span>
              <strong>50+</strong>
              <p>Delicious Items</p>
            </div>
            <div className="stat-box">
              <span>❤️</span>
              <strong>100%</strong>
              <p>Made with Love</p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}

export default OurStory;