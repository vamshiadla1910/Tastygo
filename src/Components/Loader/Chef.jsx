import React from "react";
import { motion } from "framer-motion";
import chef from "../../assets/chef.png";

const Chef = () => {
  return (
    <motion.div
      className="chefContainer"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.img
        src={chef}
        alt="Chef"
        className="chefImage"
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default Chef;