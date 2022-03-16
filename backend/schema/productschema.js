const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name:{type: 'string',required: true},
    description:{type: 'string',required: true},
    price:{type: 'string',required: true},
    category:{type: 'string',required: true},
    image:{type: 'string',required: true},
    quantity:{type: 'string',required: true},


}, {timestamps: true});

const Product = mongoose.model('product',ProductSchema);


module.exports = Product;