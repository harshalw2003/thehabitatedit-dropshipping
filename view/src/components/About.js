import React from "react";
import "../assets/css/About.css";
import Header from "./Header";
import Hero from "./hero";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      <Header />

      {/* <div className="about-main">
        <div className="about-main-header">
          <div className="about-main-left">
            ESSENTIALS THAT <br />  INSPIRE <br /> PRICES THAT AMAZE
          </div>
          <div className="about-main-mid ">
            <div className="hero_info about-hero-logo">
              <div className="hero_images">
                <div className="hero_images__overlay hero_images__overlay--left">
                  <h4>T H E</h4>
                </div>
                <div className="hero_images__overlay hero_images__overlay--right">
                  <img
                    src={require("../assets/images/up-right.png")}
                    alt="Hero Overlay"
                  />
                </div>
              </div>
              <p>THE HABITAT EDIT.</p>
            </div>
          </div>
          <div className="about-main-right">
            <p>From self-care to smart tech,
we bring comfort, style, and innovation to your everyday life</p>
      <Link to="/products"><button>EXPLORE PRODUCTS  <span className="material-symbols-outlined">arrow_right_alt</span></button></Link>
          </div>
        </div>

        <div className="about-main-heading">ABOUT US</div>
      </div> */}
      <Hero />
        <div className='hero-br'></div>


      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>Our Story</h1>
          <p className="hero-subtitle">
            Curating Quality for Your Everyday Life
          </p>
        </div>

        {/* Mission Section */}
        <section className="about-section mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              We believe in bringing you carefully selected products that
              enhance your daily life. Every item in our collection is chosen
              with purpose, quality, and sustainability in mind.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We prioritize eco-friendly products and sustainable practices in
                everything we do.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>
                Each product is carefully selected to ensure the highest quality
                standards.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                Building lasting relationships with our customers and partners
                is at our core.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>
                Constantly evolving to bring you the latest and most innovative
                products.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-section team-section">
          <h2>The Team Behind Our Success</h2>
          <div className="team-content">
            <p>
              Our dedicated team works tirelessly to bring you the best shopping
              experience. From product curation to customer service, we're here
              to help you find exactly what you're looking for.
            </p>
          </div>
        </section>

        {/* Quote Section */}
        <section className="about-section quote-section">
          <blockquote>
            "We're not just selling products; we're creating experiences and
            building a community of like-minded individuals who value quality
            and sustainability."
          </blockquote>
          <p className="quote-author">- Our Founder</p>
        </section>

        {/* Join Us Section */}
        <section className="about-section join-section">
          <h2>Join Our Journey</h2>
          <p>
            Be part of our growing community and stay updated with our latest
            collections and stories.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
