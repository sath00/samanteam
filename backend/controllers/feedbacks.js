const mongoose = require('mongoose');
const Feedback = require('../models/feedback');

//api for adding new feedback
exports.addFeedback = (req, res) => {
    const feedback = new Feedback({
        feedback: req.body.feedback,
    });
    feedback.save().then(() => {
        res.status(200).json({
            message: 'Feedback Add Successful!'
        });
    }).catch((err) => {
        res.status(400).json({
            message: err._message
        })
    })
}

//api for getting list of feedbacks
exports.getFeedback = (req, res) => {
    Feedback.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                message: err._message
            })
        })
}