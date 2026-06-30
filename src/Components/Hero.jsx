import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const images = [
  "https://images.unsplash.com/photo-1601924582970-9238bcb495d9", // pizza
  "https://images.unsplash.com/photo-1550547660-d9450f859349", // burger
  "Flamebite/src/assets/cake.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${images[index]})` }}
      />

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="left"
        >
          <h1>
            Delicious <span>Pizza</span> & Burgers
          </h1>
          <p>
            Hot, fresh and cheesy fast food delivered to your door in minutes.
          </p>

          <div className="buttons">
            <button className="btn primary">Order Now</button>
            <button className="btn secondary">View Menu</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}