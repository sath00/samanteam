//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//category schema
const CategorySchema = new Schema({
    name: { type: 'string', required: true },
}, { timestamps: true }); //added timestamps because we can use this someday


// instatiated the category model based on the schema 
const Category = mongoose.model('category', CategorySchema);

//exported the model
module.exports = {Category,CategorySchema};