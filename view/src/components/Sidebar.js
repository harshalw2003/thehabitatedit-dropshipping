// Sidebar.js
import React from "react";
import "../assets/css/Sidebar.css";

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar__filters">
      <div className="sidebar__filter-header">
        <div>
          <h4>FILTERS</h4>
        <img src={require("../assets/images/filter-icon.png")} />
        </div>
       <div>
        <h4>SORT BY</h4>
        <img src={require("../assets/images/dropdown.png")} />
       </div>
      </div>
      <div className="filter-options">
        <div className="sidebar__filter-group">
            <h4>CATEGORY </h4> 
            <img src={require("../assets/images/dropdown.png")}/>
            </div>
        <div className="sidebar__filter-group">
            <h4>PRICE RANGE </h4> 
            <img src={require("../assets/images/dropdown.png")}/>
            </div>
        <div className="sidebar__filter-group">
            <h4>COLOR  </h4>
            <img src={require("../assets/images/dropdown.png")}/>
            </div>
        <div className="sidebar__filter-group">
            <h4>BRANDS  </h4>
            <img src={require("../assets/images/dropdown.png")}/>
            </div>
        <div className="sidebar__filter-group">
            <h4>FAST SHIPPING</h4> 
            <img src={require("../assets/images/dropdown.png")}/>
            </div>
      </div>
      <button className="sidebar__clear">CLEAR FILTERS</button>
      </div>
    <div className="sidebar__products">
      <div className="sidebar__product-card">
        MOUTH CONTROLLER
        <br />
        <span>Pre order Available</span>
      </div>
      <div className="sidebar__product-card">
        ONETWO REFRIGERATOR
        <br />
        <span>Pre order Available</span>
      </div>
      <div className="sidebar__product-card">
        SOLROS SPEAKER
        <br />
        <span>Pre order Available</span>
      </div>
    </div>
  </aside>
);

export default Sidebar;
