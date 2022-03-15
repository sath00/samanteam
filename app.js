const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');


//admin username: Admin pass:tkjKS74gP3BHehQT
const dbURI = 'mongodb+srv://Admin:tkjKS74gP3BHehQT@cluster0.58qld.mongodb.net/Romels-Webmart?retryWrites=true&w=majority'


//instantiating express module
const app = express();

//connecting to our database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to database")
}).catch(err => console.log(err));

//port that we listen to
const port = 3000;

//listening
app.listen(port);

app.get('/',(req, res) => {
    res.sendFile('./views/index.html',{root:__dirname});
})
