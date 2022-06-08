const express = require('express');
const router = express.Router();
const { checkToken } = require('../authentication/authentication')
const ownerAuthController = require('../controllers/ownerAuth')

//api for editing user credentials
router.put('/edit', checkToken, ownerAuthController.editCredentials)

//login api
router.post('/login', ownerAuthController.loginUser)


module.exports = router;