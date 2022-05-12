//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//create user schema
const UserSchema = mongoose.Schema({
    username: { type: 'string', required: true},
    password: { type: 'string', required: true},
}, { timestamps: true }); //added timestamps because we can use this someday

const User = mongoose.model('user', UserSchema);

module.exports = User;