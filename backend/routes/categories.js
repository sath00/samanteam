const express = require('express');
const router = express.Router();
const { checkToken } = require('../authentication/authentication')
const categoryController = require('../controllers/categories')


//api for adding new category
router.post('/add', checkToken, categoryController.addCategory )

//api for getting category list
router.get('/list', categoryController.getCategory )

//api for deleting category
router.delete('/remove/:id', checkToken, categoryController.deleteCategory )

//api for editing category name
router.put("/edit/:id", checkToken, categoryController.updateCategory)

module.exports = router;