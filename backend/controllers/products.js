const Product = require('../models/products');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const cloudinary = require('./cloudinary');
const fs = require('fs');


exports.addProduct = async (req, res) => {
    let gPath = "";
    try{
        gPath = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
    }catch(err){
        res.status(400).json({
            message: err._message
        })
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
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: cat,
        imagePath: gPath.url,
        availability: req.body.availability
    });
    product.save().then((result) => {
        res.status(200).json({
            message: 'PRODUCT ADDED SUCCESSFULLY!'
        });
    }).catch((err) => {
        res.status(400).json({
            message: err._message
        })
    })
}

exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'PRODUCT DELETED SUCCESSFULLY!'
            });
        } else {
            res.status(200).json({
                message: 'PRODUCT NOT FOUND!'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            message: 'PRODUCT DELETED ERROR!'
        })
    })
}

exports.updateProduct = async (req, res) => {
    let impath = "";
    if (req.file) {
        const gPath = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        impath = gPath.url
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
                message: "PRODUCT UPDATED SUCCESSFULLY!"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "PRODUCT UPDATE FAILED"
            })
        })
}

exports.updateAvailability = (req, res) => {
    Product.updateOne({ _id: req.body._id }, { availability: req.body.availability })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({
                    message: 'PRODUCT AVAILABILITY UPDATED SUCCESSFULLY'
                });
            } else {
                res.status(200).json({
                    message: 'PRODUCT NOT FOUND!'
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
                message: 'PRODUCT GET ERROR'
            })
        })
}