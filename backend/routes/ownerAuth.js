const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Owner = require('../models/owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {checkToken} = require('../authentication/authentication')

//api for creating acc
// router.post('/register',(req,res) => {
//     bcrypt.hash(req.body.password, 10, (err, hash)=>{
//         if(err){
//             return res.status(400).json({
//                 error: err
//             })
//         } else {
//             const user = new Owner({
//                 username: req.body.username,
//                 password: hash,
//             });
//             user.save().then((result) => {
//                 res.status(200).json({
//                     message: "New User added successfully!"
//                 });
//             }).catch((err) => {
//                 res.status(400).json({
//                     error: err
//                 })
//             })
//         }
//     })
// })

router.put('/edit', checkToken, (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            Owner.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {
                $set: {
                    username:req.body.username,
                    password:hash
                }})
            .then((result) => {
                    res.status(200).json({message:"Credential Update Successful"})
            })
        }   
    
    })
})

router.post('/login', async (req, res) => {
    let hashPass = "";
    try {
        hashPass = await bcrypt.hash(req.body.password, 10)
    } catch (e) {
        console.log(e)
    }

    let admin;

    await Owner.findOne({ username: req.body.username })
    .then(result => {
        admin = result
    })
    

    if (req.body.username !== admin.username) {
        return res.status(401).json({ message: "Invalid username!" })
    }
    try {
        if (await bcrypt.compare(req.body.password, admin.password)) {
            const token = jwt.sign(
                { username: req.body.username, user_id: "1" },
                "secret",
                { expiresIn: "1h" }
            );
            return res.status(200).json(
                {
                    message: "Login successful!",
                    token: token,
                    expiresIn: 3600 //1h
                }
            )
        } else {
            return res.status(401).json({ message: "Invalid password!" })
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
})


router.get('/credentials',checkToken, (req, res) => {
    Owner.find().then((result) => {
        res.status(200).json(result);
    }) 
})

module.exports = router;