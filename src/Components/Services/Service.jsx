import "./Service.css";
import pizzaImg from "../../assets/pizza.jpg";
import burgerImg from "../../assets/image4.png";
import frenchFriesImg from "../../assets/fries.jpg";
import dessert from "../../assets/dessert.jpg"
import ex from "../../assets/exclusive.png"
import fd from "../../assets/fast-delivery.png"
import food from "../../assets/food.png"


function Service() {
  return (
    <div>
      <section className="services">
        <div className="heading">
          <span>Our Services</span>
          <h1>Fresh & Delicious Food</h1>
          <p>Enjoy your favorite meals prepared with fresh ingredients and delivered with love.</p>
        </div>

        <div className="service-container">
          <div className="card">
            <img src={pizzaImg} alt="Pizza" />
            <div className="content">
              <h2>Pizza</h2>
              <p>Crispy crust, rich cheese and fresh toppings made for every pizza lover.</p>
              <a href="#">Explore Menu</a>
            </div>
          </div>

          <div className="card">
            <img src={burgerImg} alt="Burger" />
            <div className="content">
              <h2>Burger</h2>
              <p>Juicy burgers with premium ingredients and unforgettable flavors.</p>
              <a href="#">Explore Menu</a>
            </div>
          </div>

          <div className="card">
            <img src={frenchFriesImg} alt="French Fries" />
            <div className="content">
              <h2>French Fries</h2>
              <p>Golden, crispy fries served fresh and hot just to make you happy.</p>
              <a href="#">Explore Menu</a>
            </div>
          </div>

          <div className="card">
            <img src={dessert} alt="Dessert" />
            <div className="content">
              <h2>Dessert</h2>
              <p>Sweet, creamy desserts prepared fresh to give every meal a perfect ending.</p>
              <a href="#">Explore Menu</a>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="title">
         
          <h1>What We Offer</h1>
          <p>Experience delicious food and premium services designed to make your dining experience unforgettable.</p>
        </div>

        <div className="service-container">
          <div className="card">
            <div className="iconn">
              <img src={food} alt="" />
            </div>
            <h2>Fresh Food</h2>
            <p>Prepared daily using fresh ingredients and authentic recipes.</p>
          </div>

          <div className="card">
            <div className="iconn">
            <img src={fd} alt="" />            
            </div>
            <h2>Fast Delivery</h2>
            <p>Get your favorite meals delivered quickly to your doorstep.</p>
          </div>

          <div className="card">
            <div className="iconn">
              <img src={ex} alt="" />
            </div>
            <h2>Best Quality</h2>
            <p>We maintain the highest standards in taste and quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
