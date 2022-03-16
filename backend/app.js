const express = require('express');
const mongoose = require('mongoose');
const ProductSchema = require('./models/products');
const bodyparser = require('body-parser');


const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'



const app = express();

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to database")
}).catch(err => console.log(err));

//body parser

app.use(bodyparser.json());


//cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})



app.post('/api/add-items',(req, res, next)=>{

    // product.save().then((result) =>{
    //     res.send('Added Successfully!');
    //     }).catch((err) =>{
    //         console.log(err);
    //     })
    const post = req.body;
    console.log(post);
    res.status(200).json({
        message:'Added Successfully!'
    })

})
app.get('/api/items',(req, res) => {

    ProductSchema.find()
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{ console.log(err); })
})

module.exports = app;