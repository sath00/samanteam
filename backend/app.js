//Imports can be found here
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
//image upload imports
// const fileUpload = require('express-fileupload');
// const cloudinary = require('cloudinary').v2;
const ProductRoute = require('./routes/products');
const CategoryRoute = require('./routes/categories');

//our mongodb URI
const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'


//instatiated the express app
const app = express();

// //cloudinary storage for image uploads
// cloudinary.config({ 
//     cloud_name: 'ddzczxjsb', 
//     api_key: '285244465365237', 
//     api_secret: 'MU5GTnp1vj0FZljnfLFbTybKQu8' 
//   });


//function that I used to connect to our mongodb
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to database")
    }).catch(err => console.log(err));


//used the body parser for parsing posts requests data this is later used in /add-items
app.use(bodyparser.json());
app.use(express.json());

//for image upload
// app.use(fileUpload({
//     useTempFiles:true
// }))

//cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next()
})


/////////////////// PRODUCTS API START HERE //////////////////////////


app.use("/api/product",ProductRoute);


/////////////////// CATEGORY API START HERE ///////////////////////////

app.use("/api/category",CategoryRoute);


module.exports = app;