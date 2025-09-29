import React, { useState } from 'react';
import '../assets/css/Contact.css';
import '../components/Header'
import Header from '../components/Header';
import Hero from '../components/hero';

const Contact = () => {
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add subscribe logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    // Add query submit logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setShowQueryForm(false);
    setQuery('');
    setName('');
  };

  return (

    <>
      <Header />
      <section className="contact-hero">
        <div className="contact-hero-left">
          <div className="contact-hero-badge">
            <span>We Would Love to Hear</span>
            <br />
            <span>from You</span>
          </div>
        </div>
        <div className="contact-hero-right">
          <p className="contact-hero-desc">
            Thank you for your interest in our mission. We value your thoughts, questions, and feedback. Please don't hesitate to reach out to us. Our dedicated team is here to assist you.
          </p>
          <div className="contact-hero-socials">
            <a href="#" aria-label="Facebook" className="contact-social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter" className="contact-social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn" className="contact-social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </section>
      <section className="contact-main-section">
        <div className="contact-main-left">
          <div className="contact-main-imgbox">
            {/* Replace src with your own image if needed */}
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Partnerships" className="contact-main-img" />
          </div>
          <div className="contact-main-card">
            <div className="contact-main-card-title">Partnerships and Collaborations</div>
            <div className="contact-main-card-email">collabs@yourdomain.com</div>
            <a href="mailto:collabs@yourdomain.com" className="contact-main-card-arrow" aria-label="Email">
              <span>&#8594;</span>
            </a>
          </div>
        </div>
        <form className="contact-main-form" onSubmit={handleQuerySubmit}>
          <div className="contact-main-form-row">
            <input type="text" placeholder="Enter First Name" className="contact-main-input" value={name} onChange={e => setName(e.target.value)} required />
            <input type="text" placeholder="Enter Last Name" className="contact-main-input" />
          </div>
          <div className="contact-main-form-row">
            <input type="email" placeholder="Enter your Email" className="contact-main-input" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Enter Phone Number" className="contact-main-input" />
          </div>
          <textarea placeholder="Enter your Message" className="contact-main-textarea" value={query} onChange={e => setQuery(e.target.value)} required />
          <div className="contact-main-form-bottom">
            <label className="contact-main-checkbox-label">
              <input type="checkbox" required />
              <span>I agree with Terms of Use and Privacy Policy</span>
            </label>
            <button type="submit" className="contact-main-submit">Send your Message</button>
          </div>
          {submitted && <div className="success-message">Thank you! We'll get back to you soon.</div>}
        </form>
      </section>
    </>
  );
};

export default Contact;
