const express = require('express');
const mongoose = require('mongoose');
const { Category } = require('../models/category');
const Product  = require('../models/products');
const router = express.Router();


//api for adding new category
router.post('/add', (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    category.save().then(() => {
        res.status(200).json({
            message: 'Category added successfully!'
        });
    }).catch((err) => {
        res.status(400).json({
            error: err._message
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
                error: err._message
            })
        })
})

//api for deleting category
router.delete('/remove/:id', (req, res) => {
    console.log("Id to remove: " + req.params.id)
    //delete the category
    Category.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then(result => {
        //when a category is deleted, edit all the products under that category (change category to "None")
        Product.updateMany({"category._id": mongoose.Types.ObjectId(req.params.id) },
            {"category._id": null, "category.name": "None" }) 
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Category was succesfully deleted!'
            });
        } else {
            res.status(200).json({
                message: 'Category was not found!'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            error: err._message
        })
    })
})

//api for editing category name
router.put("/edit/:id", (req, res) => {
    Category.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, {
        $set: { name: req.body.name }})
    .then(result=>{
        Product.updateMany({ "category._id": mongoose.Types.ObjectId(req.params.id) },
            { "category.name": req.body.name })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
    
})


router.get('/test', (req, res)=>{
    // Product.updateMany({"category._id":mongoose.Types.ObjectId(req.body._id)},
    //     {"category.name":"Beverages"} ,
    //     (err, result)=>{
    //         if(err){
    //             res.send(err);
    //         }else{
    //             res.send(result)
    //         }
            
    //     })
    // Product.updateMany(
    //     {description:"123"},
    //     {name:"12312312"})
    // .then((result)=>{
    //     res.send(result)
    // })
})


module.exports = router;