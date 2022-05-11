const express = require('express');
const mongoose = require('mongoose');
const { Category } = require('../models/category');
const Product = require('../models/products');
const router = express.Router();
const { checkToken } = require('../authentication/authentication')


//api for adding new category
router.post('/add', checkToken, (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    category.save().then(() => {
        res.status(200).json({
            message: 'Category Add Successful!'
        });
    }).catch((err) => {
        res.status(400).json({
            message: err._message
        })
    })
})


//api for getting category list
router.get('/list', (req, res) => {
    Category.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                message: err._message
            })
        })
})

//api for deleting category
router.delete('/remove/:id', checkToken, (req, res) => {
    //delete the category
    Category.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then(result => {
            //when a category is deleted, edit all the products under that category (change category to "None")
            Product.updateMany({ "category._id": mongoose.Types.ObjectId(req.params.id) },
                { "category._id": null, "category.name": "None" })
                .catch(err => {
                    res.status(500).json({
                        message: err
                    })
                })
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: 'Category Delete Succesful '
                });
            } else {
                res.status(404).json({
                    message: 'Category Not Found!'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                error: err._message
            })
        })
})

//api for editing category name
router.put("/edit/:id", checkToken, (req, res) => {
    Category.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
        $set: { name: req.body.name }
    })
        .then(result => {
            Product.updateMany({ "category._id": mongoose.Types.ObjectId(req.params.id) },
                { "category.name": req.body.name })
                .catch(err => {
                    res.status(500).json({
                        message: err
                    })
                })
            res.status(200).json({ message: "Category Edit Successful!" })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })

})

module.exports = router;