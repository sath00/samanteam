const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/category');
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
    Category.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
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
router.put("/edit/:id", (req, res, next) => {
    console.log("Category ID: " + req.params.id);
    console.log("New category name (for checking): " + req.body.name);
    Category.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, 
    {
        $set: {
            name: req.body.name
        }
    },
    {returnOriginal: false}
    )
        .then(result => {
            res.status(200).json({
                updated_category: result,
                message: 'Category was successfully updated!'
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