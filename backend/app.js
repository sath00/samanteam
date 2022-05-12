//Imports can be found here
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//routes
const ProductRoute = require('./routes/products');
const CategoryRoute = require('./routes/categories');
const StoreInfoRoute = require('./routes/storeInformation');
const UserRoute = require('./routes/user');
const path = require('path')


//our mongodb URI
const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'


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
app.use("/images", express.static(path.join("backend/images")))

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

/////////////////// Admin login API START HERE ///////////////////////////



/////////////////// Admin create account API START HERE ///////////////////////////

app.use("/api/user", UserRoute);


//all variables are defined locally but to be updated later on
app.post('/api/login', async (req, res) => {
    let hashPass = "";
    try {
        hashPass = await bcrypt.hash("Admin", 10)
    } catch (e) {
        console.log(e)
    }

    const admin = {
        username: "Admin",
        password: hashPass
    }

    if (req.body.username !== admin.username) {
        return res.status(401).json({ message: "Invalid username!" })
    }
    try {
        if (await bcrypt.compare(req.body.password, admin.password)) {
            const token = jwt.sign(
                { username: req.body.username, user_id: "1" },
                "secret",
                { expiresIn: "1h" }
            );
            return res.status(200).json(
                {
                    message: "Login successful!",
                    token: token,
                    expiresIn: 3600
                }
            )
        } else {
            return res.status(401).json({ message: "Invalid password!" })
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
})


module.exports = app;