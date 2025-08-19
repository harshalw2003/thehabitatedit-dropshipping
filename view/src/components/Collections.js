// Collections.js
import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';
import '../assets/css/CollectionCard.css';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sample data for collections in case the API fails
  const sampleCollections = [
    {
      id: 1,
      title: "Tech & Gadgets",
      description: "Latest innovative gadgets for everyday use",
      image: require("../assets/images/tech-and-gadgets.jpg")
    },
    {
      id: 2,
      title: "Self Care",
      description: "Premium self-care products for your wellbeing",
      image: require("../assets/images/self-care.jpg")
    },
    {
      id: 3,
      title: "Home Decor",
      description: "Beautiful items to enhance your living space",
      image: require("../assets/images/home-decor.jpg")
    },
    {
      id: 4,
      title: "Auto Care",
      description: "Quality products for your vehicle maintenance",
      image: require("../assets/images/auto-care.jpg")
    }
  ];
  
  useEffect(() => {
    // You can fetch real collections from your API here
    // For now using sample data
    setTimeout(() => {
      setCollections(sampleCollections);
      setLoading(false);
    }, 500);
  }, []);
  
  if (loading) {
    return (
      <div className="collections-section">
        <h4>OUR COLLECTIONS</h4>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="spinner-circle" style={{ margin: '0 auto' }}></div>
          <p>Loading collections...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="collections-section">
      <h4>OUR COLLECTIONS</h4>
      <div className="collections-grid">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default Collections;
