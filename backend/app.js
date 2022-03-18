//Imports can be found here
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
const bodyparser = require('body-parser');


//our mongodb URI
const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'


//instatiated the express app
const app = express();


//function that I used to connect to our mongodb
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to database")
}).catch(err => console.log(err));



//used the body parser for parsing posts requests data this is later used in /add-items
app.use(bodyparser.json());


//cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})


//this is the api for adding items to our database
app.post('/api/add-items',(req, res, next)=>{
    const product = new Product({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.body.image,
        quantity:req.body.quantity
    });
    product.save().then((result) =>{
        res.status(200).json({
        message:'Added Successfully!'});
    }).catch((err) =>{
        console.log(err);
    })
})


//this is the api for getting the items in the database
app.get('/api/items',(req, res) => {
    Product.find()
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{ console.log(err); })

})

module.exports = app;