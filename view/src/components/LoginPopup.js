import React, { useState } from 'react';
import '../assets/css/LoginPopup.css';

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [alert, setAlert] = useState({ message: '', type: '' }); // type can be 'success' or 'error'
  const [isNewUser, setIsNewUser] = useState(false); // Flag to distinguish between login and signup

  const handleSendOtp = () => {
    // Clear previous alerts
    setAlert({ message: '', type: '' });
    
    // Validate input based on whether it's a new user (signup) or existing user (login)
    const isValidInput = isNewUser 
      ? (phoneNumber.length === 10 && firstName.trim() !== '' && lastName.trim() !== '')
      : (phoneNumber.length === 10);
    
    if (isValidInput) {
      // Show sending message
      setAlert({ message: 'Sending OTP, please wait...', type: 'info' });
      
      // Prepare request body based on whether it's new user or not
      const requestBody = isNewUser
        ? { firstName, lastName, phoneNumber }
        : { phoneNumber };
        
      fetch(`http://localhost:8001/user/send-otp`,
        { method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOtpSent(true);
          setAlert({ message: `OTP sent successfully to +91 ${phoneNumber}`, type: 'success' });
        } else {
          console.log("Failed to send OTP");
          setAlert({ message: 'Failed to send OTP. Please try again.', type: 'error' });
        }
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
        setAlert({ message: 'An error occurred. Please try again later.', type: 'error' });
      });
    }
  };  

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    // Clear previous alerts
    setAlert({ message: '', type: '' });
    
    // Show verifying message
    setAlert({ message: 'Verifying OTP...', type: 'info' });
    
    fetch(`http://localhost:8001/user/verify-otp`,
      { method: 'POST',
        body: JSON.stringify({ 
          phoneNumber: phoneNumber, 
          otp: otp.join('') 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAlert({ message: 'Login successful!', type: 'success' });
        
        // Save only authentication state to localStorage, no sensitive data
        localStorage.setItem('isLoggedIn', 'true');
        
        // If we received a token from the backend, store it
        if (data.token) {
          console.log(data.token)
          localStorage.setItem('authToken', data.token);
        }
        
        // Notify parent component about successful login - only pass minimal info
        if (onLoginSuccess) {
          onLoginSuccess(true); // Just pass authentication state, not user data
        }
        
        setTimeout(() => onClose(), 1500); // Close popup after showing success message
      } else {
        console.log("Failed to verify OTP");
        setAlert({ message: 'Invalid OTP. Please try again.', type: 'error' });
      }
    })
    .catch(error => {
      console.error("Error verifying OTP:", error);
      setAlert({ message: 'An error occurred. Please try again later.', type: 'error' });
    });
  };
  
  // Function to go back to phone input from OTP screen
  const handleBackToPhone = () => {
    setOtpSent(false);
    setAlert({ message: '', type: '' });
    setOtp(['', '', '', '', '', '']); // Reset OTP fields
  };
  
  // Function to show the sign up view with name fields
  const showSignUpView = () => {
    setIsNewUser(true);
    setAlert({ message: '', type: '' });
  };
  
  // Function to go back to login view (phone number only)
  const backToLoginView = () => {
    setIsNewUser(false);
    setFirstName('');
    setLastName('');
    setAlert({ message: '', type: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="login-popup__close" onClick={onClose}>×</button>
        <div className="login-popup__header">
          <h2>{isNewUser ? "Sign Up for" : "Login to"} <span>T H E</span></h2>
          {/* <p>Enter your details to access your account</p> */}
        </div>

        <div className="login-popup__content">
          {alert.message && (
            <div className={`login-popup__alert login-popup__alert--${alert.type}`}>
              {alert.message}
            </div>
          )}
          
          {!otpSent ? (
            !isNewUser ? (
              // Login View - Phone number only
              <>
                <div className="login-popup__input-group">
                  <label>Phone Number</label>
                  <div className="login-popup__phone-input">
                    <span>+91</span>
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <button 
                  className="login-popup__submit-btn"
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10}
                >
                  Send OTP on <img src={require("../assets/images/whatsapp-icon.png")} alt="WhatsApp" />
                </button>
                
                <div className="login-popup__signup-link">
                  <span>New to T H E? </span>
                  <button onClick={showSignUpView}>Sign Up</button>
                </div>
              </>
            ) : (
              // Sign Up View - With name fields and back button
              <>
                <button className="login-popup__back-btn" onClick={backToLoginView}>
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                  Back
                </button>
                
                <div className="login-popup__input-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="Enter your first name"
                    className="login-popup__text-input"
                  />
                </div>
                
                <div className="login-popup__input-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Enter your last name"
                    className="login-popup__text-input"
                  />
                </div>
                
                <div className="login-popup__input-group">
                  <label>Phone Number</label>
                  <div className="login-popup__phone-input">
                    <span>+91</span>
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <button 
                  className="login-popup__submit-btn"
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10 || !firstName.trim() || !lastName.trim()}
                >
                  Send OTP on <img src={require("../assets/images/whatsapp-icon.png")} alt="WhatsApp" />
                </button>
              </>
            )
          ) : (
            <>
              <button className="login-popup__back-btn" onClick={handleBackToPhone}>
             <span className="material-symbols-outlined">arrow_right_alt</span>
                Back
              </button>
              
              <div className="login-popup__input-group">
                <label>Enter OTP sent to +91 {phoneNumber}</label>
                <div className="login-popup__otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <div className="login-popup__resend">
                  Didn't receive code? <button onClick={handleSendOtp}>Resend</button>
                </div>
              </div>
              <button 
                className="login-popup__submit-btn"
                onClick={handleVerifyOtp}
                disabled={otp.some(digit => digit === '')}
              >
                Verify & Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
