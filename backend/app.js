const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const port = 8001;

//Middlewares
app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//importing Routes
const shopifyRoutes = require("./routes/shopify.js")
const userRoutes = require("./routes/user.js")
app.use('/shopify',shopifyRoutes)
app.use('/user',userRoutes)

const connectDb = async () => {
    try {

        // await mongoose.connect("mongodb://admin:password@35.225.223.159:27017/Cricketory?authSource=admin")
        await mongoose.connect("mongodb://localhost:27017/THE")
        console.log("Connection  to DB Successfull")

    } catch (err) {

        console.log("Connection  to DB failed")

    }
}


//Connect to db
connectDb()

const serverUp = () => {

    console.log("Server is up and running at port " + port)
    
}

app.listen(port,'0.0.0.0', serverUp)
