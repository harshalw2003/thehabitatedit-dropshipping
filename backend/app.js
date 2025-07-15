const express = require('express');
const cors = require("cors");
const app = express();
const port = 8001;

//Middlewares
app.use(cors());
app.use(express.json())
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//importing Routes
const shopifyRoutes = require("./routes/shopify.js")
app.use('/shopify',shopifyRoutes)


const serverUp = () => {

    console.log("Server is up and running at port " + port)
    
}

app.listen(port,'0.0.0.0', serverUp)
