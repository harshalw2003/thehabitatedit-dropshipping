import React, { useState, useEffect } from 'react';
import '../assets/css/CategoryButtons.css';

const CategoryButtons = ({ activeCategory: externalActiveCategory, setActiveCategory: externalSetActiveCategory }) => {
  // Use local state if no external state is provided
  const [localActiveCategory, setLocalActiveCategory] = useState('All products');
  
  // Determine if we should use external or local state
  const activeCategory = externalActiveCategory !== undefined ? externalActiveCategory : localActiveCategory;
  const setActiveCategory = externalSetActiveCategory || setLocalActiveCategory;
  
  // Update local state if external state changes
  useEffect(() => {
    if (externalActiveCategory) {
      setLocalActiveCategory(externalActiveCategory);
    }
  }, [externalActiveCategory]);

  const categories = [
    'All products',
    'Tech & Gadgets',
    'Self care',
    'Home Decor',
    'Auto Care'
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // You can add logic here to filter products based on selected category
  };

  return (
    <div className="category-buttons">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
