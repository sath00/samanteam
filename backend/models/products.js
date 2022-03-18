//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//product schema
const ProductSchema = new Schema({
    name:{type: 'string',required: true},
    description:{type: 'string',required: true},
    price:{type: 'string',required: true},
    category:{type: 'string',required: true},
    image:{type: 'string',required: true},
    quantity:{type: 'string',required: true},


}, {timestamps: true}); //added timestamps because we can use this someday


// instatiated the product model based on the schema 
const Product = mongoose.model('product',ProductSchema);

//exported the model
module.exports = Product;