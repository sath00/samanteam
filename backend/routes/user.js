const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {        //checker api in postman /api/user
    res.status(200).json({
        message : 'user route working'
    })
})

//api for creating acc
router.post('/register',(req,res,next) => {
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            const user = new User({
                username: req.body.username,
                password: hash,
                userType: req.body.userType
            });
            user.save().then((result) => {
                res.status(200).json({
                    message: "New User added successfully!"
                });
            }).catch((err) => {
                res.status(400).json({
                    error: err
                })
            })
        }
    })
})

module.exports = router;