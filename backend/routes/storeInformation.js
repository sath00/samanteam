const express = require('express');
const router = express.Router();

const { checkToken } = require('../authentication/authentication')
const storeInfoController = require('../controllers/storeinformation')


router.get('/details', storeInfoController.getInfo )

router.put('/update', checkToken, storeInfoController.updateInfo )

module.exports = router;