const express = require('express');
const Product = require('../models/products');
const mongoose = require('mongoose');
const router = express.Router();


//api for deleting products
router.delete('/remove/:id', (req, res) => {
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
})

//api for adding product (original)
router.post('/add', (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
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
})

//api for adding product with cloudinary upload image
// router.post('/api/add-product', (req, res, next) => {
//     const file = req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath,(err,result) => {
//         console.log(result);
//         const product = new Product({
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             category: req.body.category,
//             image: result.url,
//             availability: req.body.availability
//         });
//     });
//     product.save().then((result) => {
//         res.status(200).json({
//             message: 'Product added successfully!'
//         });
//     }).catch((err) => {
//         res.status(400).json({
//             error: err._message
//         })
//     })
// })

//this is the api for marking products as sold out or available
router.post('/availability', (req, res) => {
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
})


//this is the api for getting the products in the database
router.get('/list', (req, res) => {
    Product.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({
                error: err._message
            })
        })
})

//this is the api for searching products
router.get("/search/:key", async (req, res) => {
    let data = await Product.find(
        {
            "$or": [
                { "name": { $regex: req.params.key } },
                { "category": { $regex: req.params.key } }
            ]
        }
    )
    res.json(data)
})

//api for obtaining a single product data
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    Product.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((result) => {
            res.status(200).json(result);
            //should we add a checker if the returned document is null or not?
        }).catch(err => {
            res.status(400).json({
                error: err._message
            })
        })
})

//api for editing details in product
router.put("/edit/:id", (req, res) => {
    Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            imagePath: req.body.imagePath,
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
})


module.exports = router;