import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../Hero/Hero";
import OurSpecials from "../OurSpecials/OurSpecials";
import Specialization from "../Specializations/Specialization";
import Ourstory from "../Ourstory/Ourstory";
import PizzaMenu from "../Pizzas/Pizza";
import BurgerMenu from "../Burgers/Burger";
import FriesMenu from "../Fries/Fries";
import DessertMenu from "../Desserts/Dessert";
import Service from "../Services/Service"
import "./Home.css";

function Home() {
  // useLocation lets us read the "state" that Navbar attaches when it
  // navigates here from another page (e.g. from /menu, clicking "About").
  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    // Small delay so the section actually exists in the DOM before we
    // try to scroll to it (Home has just mounted on this render).
    const timer = setTimeout(() => {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Hero />
      <OurSpecials />
      <Specialization />
      <Ourstory />
      <div className="restaurant-section" id="find-restaurant">
        <div className="container">
          <h2 className="section-title">Find Our Restaurant</h2>
          <div className="map-wrapper">
            <iframe
              title="Tastygo location"
              src="https://maps.google.com/maps?q=Tastygo%20restaurant%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
