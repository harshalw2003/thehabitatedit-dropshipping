const express = require("express");
const accountSid = 'AC67e2ad371d0914db9faa2b7b8aa2e1cf';
const authToken = '0dc2a801ec288023c09b29042963668f';
const client = require('twilio')(accountSid, authToken);

const router = express.Router();

// Mock DB (for demo only)
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  console.log("Phone number received:", phoneNumber);

  if (!phoneNumber) return res.status(400).json({ success: false, message: "Phone number required" });

  const otp = generateOTP();
  otpStore.set(phoneNumber, otp); // Save for verification (in-memory)

//   try {
//     const message = await client.messages.create({
//         body: `Your OTP for login to The habitat Edit is ${otp}`,
//         from: '+12513250217',
//         to: `+91${phoneNumber}`
//     });
try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
      contentVariables: `{"1":"${otp}"}`,
      to: `whatsapp:+91${phoneNumber}`,
    //   body: `Your OTP is: ${otp}`
    });

    console.log("OTP sent:", otp);
    res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  const storedOtp = otpStore.get(phoneNumber);

  if (storedOtp === otp) {
    otpStore.delete(phoneNumber);
    console.log("OTP verified for:", phoneNumber);
    return res.status(200).json({ success: true, message: "OTP verified" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});


module.exports = router;