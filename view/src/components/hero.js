import React from 'react'
import '../assets/css/Hero.css'


const  hero = () => {
  return (
   <div className='hero'>
     <div className='hero_info'>
      <div className='hero_images'>
       
        <div className='hero_images__overlay hero_images__overlay--left'>
          <h4>T H E</h4>
        </div>
        <div className='hero_images__overlay hero_images__overlay--right'>
          <img src={require('../assets/images/up-right.png')} alt="Hero Overlay" />
        </div>
      </div>  
    <p>
        THE HABITAT EDIT. 
    </p>
    </div>
     <div className="hero_title">
      <h4 className='desktop_title'>ALL YOUR FAVORITES<br/>IN ONE PLACE</h4>
      <h4 className='mobile_title'>ESSENTIALS  <br/> THAT INSPIRE <br/> PRICES THAT AMAZE</h4>
    </div>
   </div>
  )
}
export default hero;
