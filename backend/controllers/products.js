const Product = require('../models/products');
const { Category } = require('../models/category');
const mongoose = require('mongoose');


exports.addProduct = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    //Category Check
    let cat = new Category({
        _id: null,
        name: "None"
    });
    if (req.body.category !== "") {
        await Category.findOne({ _id: mongoose.Types.ObjectId(req.body.category) }).then(result => {
            cat = result;
        });
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: cat,
        imagePath: url + "/images/" + req.file.filename,
        availability: req.body.availability
    });
    product.save().then((result) => {
        res.status(200).json({
            message: 'Product added successfully!'
        });
    }).catch((err) => {
        res.status(400).json({
            error: err._message
        })
    })
}

exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Product was succesfully deleted!'
            });
        } else {
            res.status(200).json({
                message: 'Product was not found!'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            error: err._message
        })
    })
}

exports.updateProduct = async (req, res) => {
    let impath = "";
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        impath = url + "/images/" + req.file.filename;
    } else {
        impath = req.body.imagePath;
    }
    //Category Check
    let cat = new Category({
        _id: null,
        name: "None"
    });
    if (req.body.category !== "") {
        await Category.findOne({ _id: mongoose.Types.ObjectId(req.body.category) }).then(result => {
            cat = result;
        });
    }
    Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: cat,
            imagePath: impath,
            availability: req.body.availability
        }
    })
        .then(result => {
            res.status(200).json({
                message: "Product Updated successfully!"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.updateAvailability = (req, res) => {
    Product.updateOne({ _id: req.body._id }, { availability: req.body.availability })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({
                    message: 'Product was succesfully Updated!'
                });
            } else {
                res.status(200).json({
                    message: 'Product was not found!'
                });
            }
        })
}

exports.getProducts = (req, res) => {
    Product.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                error: err._message
            })
        })
}