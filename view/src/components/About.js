import React from "react";
import "../assets/css/About.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <div className="about-grid">
          <div className="about-left">
            <div className="about-content">
              <h1>THE HABITAT EDIT</h1>
              <h2>Curating Lifestyle Essentials</h2>
              <p>
                Welcome to a world where style works for you. We’re here to make
                your everyday a little easier, a little smarter, and a lot more
                enjoyable. Our products aren’t just about looking good, they’re
                about fitting seamlessly into your routine and making life
                smoother. Every item we select is chosen with care, blending
                simple style with real functionality. Whether it’s something to
                organize your space, simplify your day, or add a touch of
                comfort, you’ll find it here. Think of us as your go-to place
                for practical finds that still feel special. Because we believe
                the things you use daily should do more than just “get the job
                done”—they should make you feel good while doing it.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50k+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
              <Link to="/products" className="explore-button">
                Explore Collection <span>→</span>
              </Link>
            </div>
          </div>
          <div className="about-right">
            <div className="image-grid">
              <div className="image-item">
                <img
                  src={require("../assets/images/tech-and-gadgets.jpg")}
                  alt="Tech"
                />
                <span>Tech</span>
              </div>
              <div className="image-item">
                <img
                  src={require("../assets/images/home-decor.jpg")}
                  alt="Home"
                />
                <span>Home</span>
              </div>
              <div className="image-item">
                <img
                  src={require("../assets/images/self-care.jpg")}
                  alt="Self Care"
                />
                <span>Self Care</span>
              </div>
              <div className="image-item">
                <img
                  src={require("../assets/images/auto-care.jpg")}
                  alt="Auto Care"
                />
                <span>Auto Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="about-section join-section">
          <h2>Join Our Journey</h2>
          <p>
            Be part of our growing community and stay updated with our latest
            collections and stories.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </section> */}
      </div>

      <Footer />
    </div>
  );
};

export default About;
