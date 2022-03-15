const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
const path = require('path');


//admin username: Admin pass:tkjKS74gP3BHehQT
const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'




//instantiating express module
const app = express();


//setting up view engine
app.set('view engine', 'ejs');

//connecting to our database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to database")
}).catch(err => console.log(err));

//port that we listen to
const port = 3000;

//listening
app.listen(port);
//
//making front-end assets public
app.use(express.static('./front-end/'))


app.get('/',(req, res) => {
    res.render('index');
})

app.get('/inventory',(req,res)=>{
    Product.find()
    .then((result)=>{
        res.render('inventory',{items:result});
        module.exports.result = result;
    }).catch((err)=>{ console.log(err); })
    
})