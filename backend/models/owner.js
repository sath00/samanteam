//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//create owner schema
const OwnerSchema = mongoose.Schema({
    username: { type: 'string', required: true},
    password: { type: 'string', required: true},
}, { timestamps: true }); //added timestamps because we can use this someday

const Owner = mongoose.model('owner', OwnerSchema);

module.exports = Owner;