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
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to database")
    }).catch(err => console.log(err));


//used the body parser for parsing posts requests data this is later used in /add-items
app.use(bodyparser.json());


//cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

//api for deleting items
app.delete('/api/remove-item/:id', (req, res) => {
    Product.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Product was succesfully deleted!'
            });
        } else {
            res.status(200).json({
                message: 'Product was not found!'
            });
        }
    })
})


//api for adding items 
app.post('/api/add-items', (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        availability: req.body.availability
    });
    product.save().then((result) => {
        res.status(200).json({
            message: 'Product added successfully!'
        });
    }).catch((err) => {
        res.status(400).json({
            error: err._message
        })
    })
})

//this is the api for marking items as sold out or available

app.post('/api/item/availability', (req, res) => {
    Product.updateOne({ _id:req.body._id }, { availability: req.body.availability })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({
                    message: 'Product was succesfully Updated!'
                });
            } else {
                res.status(200).json({
                    message: 'Product was not found!'
                });
            }
        })
})


//this is the api for getting the items in the database
app.get('/api/items', (req, res) => {
    Product.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                error: err._message
            })
        })
})

//this is the api for searching products
app.get("/api/search/:key", async (req, res) => {
    //print to console what is searched
    // console.log(req.params.key)
    let data = await Product.find(
        {
            "$or":[
                { "name":{$regex:req.params.key}},
                { "category":{$regex:req.params.key}}
            ]
        }
    )
    res.send(data)
})

//api for obtaining a single product data
app.get("/api/get-product/:id",(req,res)=>{
    console.log(req.params.id);
    Product.findOne({ _id: mongoose.Types.ObjectId(req.params.id)})
    .then((result)=>{
        res.status(200).json(result);
        //should we add a checker if the returned document is null or not?
    }).catch(err => {
        res.status(400).json({
            error: err._message
        })
    })
})





module.exports = app;