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

          <div className="restaurant-content">

            <div className="restaurant-details">

              <h3>📍 Visit TastyGo</h3>

              <p>
                Welcome to <strong>TastyGo</strong>, where every meal is prepared
                fresh with love and quality ingredients. Come and enjoy our delicious
                pizzas, burgers, fries, desserts, and much more.
              </p>

              <div className="map-grid">
                <div className="detail">

                  <h4>📍 Address</h4>

                  <p>
                    1-4-879/52, New Bakaram
                    <br />
                    Gandhi Nagar
                    <br />
                    Hyderabad, Telangana - 500080
                  </p>
                </div>

                <div className="detail">

                  <h4>📞 Contact</h4>

                  <p>+91 98765 43210</p>

                  <h4 className="email-title">✉️ Email</h4>

                  <p>tastygo@gmail.com</p>
                </div>

                <div className="detail">

                  <h4>⏰ Working Hours</h4>

                  <p>10:00 AM - 11:00 PM</p>

                  <h4 className="delivery-title">🚚 Delivery</h4>

                  <p>Fast delivery across Hyderabad.</p>

                </div>

                <div className="Tastygo-map">

                  <iframe
                    title="TastyGo Location"
                    src="https://maps.google.com/maps?q=Tastygo%20restaurant%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    allowFullScreen
                  />

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Home;