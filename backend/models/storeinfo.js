//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//store info schema
const StoreInfoSchema = new Schema({
    telephone: { type: 'string'},
    cellphone: { type: 'string'},
    streetAdd: { type: 'string'},
    city: { type: 'string'},
    state: {type: 'string'},
    zip: { type: 'string'},
    details: { type: 'string'}
}, { timestamps: true }); //added timestamps because we can use this someday


// instatiated the store info model based on the schema 
const StoreInfo = mongoose.model('storeinfo', StoreInfoSchema);

//exported the model
module.exports = StoreInfo;