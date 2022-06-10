const express = require('express');
const router = express.Router();
const { checkToken } = require('../authentication/authentication');
const feedbackController = require('../controllers/feedbacks')

//api for adding new feedback
router.post('/add', feedbackController.addFeedback)

//api for getting list of feedbacks
router.get('/list', checkToken, feedbackController.getFeedback)

module.exports = router;