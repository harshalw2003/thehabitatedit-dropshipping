const jwt = require('jsonwebtoken')
const User = require('../models/user.js');


const authenticateToken = async (req, res, next) => {
    console.log("authenticateToken check Hit")
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;   
    console.log("Token received:", token); 
    if(token){
      // console.log(`Authentication token : ${token}`)
      jwt.verify(token, process.env.JWT_SECRET_KEY,async  (err, user) => {
        console.log(user)
        if (err) {return res.status(403).send('Invalid Token');}
        else{
  
        const userDetails = await User.findById(user.id)

        req.user = userDetails;
        console.log(req.user)
        next();}
      });
    }else{

    res.status(401).json({
      success: false,
      message: "You are not authenticated"
    });
    }
   
}


module.exports ={
  
  authenticateToken,

}
