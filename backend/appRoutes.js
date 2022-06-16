//Imports can be found here
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


//routes
const ProductRoute = require('./routes/products');
const CategoryRoute = require('./routes/categories');
const StoreInfoRoute = require('./routes/storeInformation');
const OwnerAuthRoute = require('./routes/ownerAuth');
const FeedbackRoute = require('./routes/feedbacks');
const path = require('path')


//our mongodb URI
const dbURI = 'mongodb+srv://Admin:'+process.env.MONGO_ATLAS_PW+'@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'


//instatiated the express app
const app = express();

//function that I used to connect to our mongodb
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to database")
    }).catch(err => console.log(err));


//used the body parser for parsing posts requests data this is later used in /add-items
app.use(bodyparser.json());
app.use(express.json());
app.use("backend/images", express.static(path.join("images")))

//cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next()
})


/////////////////// PRODUCTS API START HERE //////////////////////////

app.use("/api/product", ProductRoute);

/////////////////// CATEGORY API START HERE ///////////////////////////

app.use("/api/category", CategoryRoute);

/////////////////// StoreInfo API START HERE ///////////////////////////

app.use("/api/store-info", StoreInfoRoute);

/////////////////// Admin API START HERE ///////////////////////////

app.use("/api/admin", OwnerAuthRoute);

/////////////////// Feedback API START HERE ///////////////////////////

app.use("/api/feedback", FeedbackRoute);





module.exports = app;