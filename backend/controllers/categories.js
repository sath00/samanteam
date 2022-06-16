const mongoose = require('mongoose');
const { Category } = require('../models/category');
const Product = require('../models/products');

exports.addCategory = (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    category.save().then(() => {
        res.status(200).json({
            message: 'CATEGORY ADDED SUCCESSFULLY!'
        });
    }).catch((err) => {
        res.status(400).json({
            message: 'CATEGORY ADD FAILED!'
        })
    })
}

exports.getCategory = (req, res) => {
    Category.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                message: err._message
            })
        })
}

exports.deleteCategory = (req, res) => {
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
                    message: 'CATEGORY DELETED SUCCESSFULLY!'
                });
            } else {
                res.status(404).json({
                    message: 'CATEGORY NOT FOUND!'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                message: 'CATEGORY DELETE FAILED!'
            })
        })
}

exports.updateCategory = (req, res) => {
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
            res.status(200).json({ message: "CATEGORY UPDATED SUCCESSFULLY!" })
        })
        .catch(err => {
            res.status(500).json({
                message: 'CATEGORY UPDATE FAILED!'
            })
        })

}