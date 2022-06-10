//Imports
const mongoose = require('mongoose');

//instantiated the schema
const Schema = mongoose.Schema;

//store info schema
const FeedbackSchema = new Schema({
    feedback: { type: 'string', required: true},
}, { timestamps: true }); //added timestamps because we can use this someday


// instatiated the store info model based on the schema 
const Feedback = mongoose.model('feedback', FeedbackSchema);

//exported the model
module.exports = Feedback;