const express = require('express');
const mongoose = require('mongoose');
const ProductSchema = require('./schema/productschema')


const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'



const app = express();

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to database")
}).catch(err => console.log(err));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.use('/api/items',(req, res) => {

    ProductSchema.find()
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{ console.log(err); })
})

app.use('/api/add-items',(req, res)=>{
    // const items = [
    //     {name:'Ariel',description:'Ariel Powder',price:'7.50', category:"Soap",image:"sabon",quantity:"100"},
    //     {name:'Tide',description:'Tide Bar',price:'11.50', category:"Soap",image:"sabon",quantity:"69"}
    // ]
    const product = new ProductSchema({
        name:'Tide',description:'Tide Bar',price:'11.50', category:"Soap",image:"sabon",quantity:"69"
    })

    product.save().then((result) =>{
        res.send('Added Successfully!');
        }).catch((err) =>{
            console.log(err);
        })
})

module.exports = app;