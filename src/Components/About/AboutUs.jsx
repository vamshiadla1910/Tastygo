import aboutImg from "../../assets/Logo.png";
import "./AboutUs.css";

function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="about-hero">
        <div className="about-hero-text">
          <p className="about-tag">About Us</p>
          <h1>
            Fresh food, warm service, and a story built on
            <span> flavor</span>
          </h1>
          <p className="about-lead">
            At FoodHub, we started with one simple idea — serve food that feels
            exciting, comforting, and unforgettable. From handcrafted pizzas to
            loaded fries, juicy burgers, and sweet desserts, every item is made
            to bring people together.
          </p>
        </div>

        <div className="about-hero-image">
          <img src={aboutImg} alt="Delicious food from FoodHub" className="about-img" />
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h2>Our Beginning</h2>
          <p>
            FoodHub began as a small kitchen with a big love for fresh
            ingredients and bold taste. What started as a passion for serving
            handcrafted comfort food slowly grew into a place where every meal
            feels special.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Believe</h2>
          <p>
            We believe good food should be full of flavor, made with care, and
            served with consistency. That is why we focus on quality,
            cleanliness, quick service, and dishes that look as good as they
            taste.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Serve</h2>
          <p>
            Our menu is built around crowd favorites — pizzas, burgers, fries,
            and desserts — prepared to suit both everyday cravings and special
            moments. Every section of our menu is designed to feel fun, rich,
            and satisfying.
          </p>
        </div>

        <div className="about-card">
          <h2>Why People Choose Us</h2>
          <p>
            Customers choose FoodHub for its cozy experience, stylish menu
            presentation, and flavors that feel familiar yet exciting. We aim to
            make every order fast, fresh, and worth coming back for.
          </p>
        </div>
      </div>

      <div className="about-highlight">
        <div className="highlight-box">
          <h2>Our Mission</h2>
          <p>
            To serve delicious food with heart, combining freshness, creativity,
            and comfort in every bite.
          </p>
        </div>

        <div className="highlight-box">
          <h2>Our Vision</h2>
          <p>
            To become a favorite food destination where quality meals and joyful
            moments are shared every day.
          </p>
        </div>
      </div>

      
    </section>
  );
}

export default AboutUs;