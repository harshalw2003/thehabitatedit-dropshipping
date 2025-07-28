import React, { useState } from 'react';
import '../assets/css/LoginPopup.css';

const LoginPopup = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOtp = () => {
    // In a real application, you would send an API request here

    if (phoneNumber.length === 10) {

fetch(`http://localhost:8001/verify/send-otp`,
  { method: 'POST',
    body: JSON.stringify({ phoneNumber: phoneNumber }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOtpSent(true);
        } else {
          console.log("Failed to send OTP");
        }
      });
    }
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
    // In a real application, you would verify the OTP here

    fetch(`http://localhost:8001/verify/verify-otp`,
  { method: 'POST',
    body: JSON.stringify({ phoneNumber: phoneNumber, otp: otp.join('') }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          onClose();
        } else {
          console.log("Failed to verify OTP");
        }
      });
  };

  if (!isOpen) return null;

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="login-popup__close" onClick={onClose}>×</button>
        <div className="login-popup__header">
          <h2>Login to T H E</h2>
          <p>Enter your details to access your account</p>
        </div>

        <div className="login-popup__content">
          {!otpSent ? (
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
                Send otp on <img  src={require("../assets/images/whatsapp-icon.png")} alt="WhatsApp" />
              </button>
            </>
          ) : (
            <>
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
                  Didn't receive code? <button>Resend</button>
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
