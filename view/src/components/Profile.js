import React, { useState, useEffect } from 'react';
import '../assets/css/Profile.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './hero';
import Footer from './Footer';
import YourOrders from './YourOrders';
import Wishlist from './Wishlist';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserDetails({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(userDetails)
      });

      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // alert('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('authToken');
      navigate('/');
    } catch(error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Header />
      <Hero/>
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <h4>YOUR ACCOUNT</h4>
          </div>
          <nav className="sidebar-navigation">
            <button 
              className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              <span>PROFILE</span>
              <img src={require('../assets/images/up-right-arrow.png')} alt="Right Arrow" />
            </button>
            <button 
              className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveSection('orders')}
            >
              <span>YOUR ORDERS</span>
              <img src={require('../assets/images/up-right-arrow.png')} alt="Right Arrow" />
            </button>
            <button 
              className={`nav-item ${activeSection === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveSection('wishlist')}
            >
              <span>YOUR WISHLIST</span>
              <img src={require('../assets/images/up-right-arrow.png')} alt="Right Arrow" />
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              <span>LOGOUT</span>
            </button>
          </nav>
        </div>
        <div className="profile-content">
          <div className={`profile profile-section ${activeSection === 'profile' ? 'active' : ''}`}>
            <h1 className='profile profile-content-heading'>
              <img src={require('../assets/images/user-icon.png')} alt="User Icon" /> PROFILE 
            </h1>
            <div className="profile-details-container">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <form onSubmit={handleUpdateProfile} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value="Harshal"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value="Warukar"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value="harshalwarukar12@gmail.com"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value="9766629195"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-actions">
                    {isEditing ? (
                      <>
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button 
                          type="button" 
                          className="cancel-btn"
                          onClick={() => {
                            setIsEditing(false);
                            fetchUserDetails(); // Reset to original values
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        type="button" 
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className={`orders profile-section ${activeSection === 'orders' ? 'active' : ''}`}>
            <h1 className='profile profile-content-heading'><img src={require('../assets/images/order-icon.png')} alt="Right Arrow" /> ORDERS </h1>
            <YourOrders />
          </div>
          <div className={`wishlist profile-section ${activeSection === 'wishlist' ? 'active' : ''}`}>
            <h1 className='profile profile-content-heading'><img src={require('../assets/images/wishlist-filled-icon.png')} alt="Right Arrow" /> WISHLIST</h1>
            <Wishlist/>
          </div>
         
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;