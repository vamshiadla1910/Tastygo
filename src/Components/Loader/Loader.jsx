import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";
import Chef from "./Chef";

import pizza from "../../assets/pizza.png";
import burger from "../../assets/burger.png";
import dessert from "../../assets/dessert.png";


const Loader = () => {
  return (
    <div className="loader">

      {/* Background Glow */}
      <div className="backgroundGlow"></div>

      {/* Floating Particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Logo */}
      <motion.h1
        className="logo"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        TASTYGO
      </motion.h1>

      {/* Chef */}
      <Chef />

      {/* Food Section */}
      <div className="foodContainer">

        {/* Burger */}
        <motion.img
          src={burger}
          alt="Burger"
          className="burger"
          animate={{
            y: [0, -15, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Pizza */}
        <motion.img
          src={pizza}
          alt="Pizza"
          className="pizza"
          animate={{
            rotateY: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Dessert */}
        <motion.img
          src={dessert}
          alt="Dessert"
          className="dessert"
          animate={{
            y: [0, -15, 0],
            rotate: [8, -8, 8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

      </div>

      {/* Loading Text */}
      <motion.h2
        className="loadingTitle"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Cooking Something Delicious...
      </motion.h2>

      {/* Progress Bar */}
      <div className="progressBar">
        <motion.div
          className="progress"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.p
        className="loadingText"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        Preparing your order...
      </motion.p>

    </div>
  );
};

export default Loader;