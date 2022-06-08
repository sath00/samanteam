const Owner = require('../models/owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.editCredentials = async (req, res) => {
    let newHash;
    await bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        newHash = hash
    })
    let admin;
    await Owner.find().then((result => {
        admin = result[0]
    }))
    if (!admin) {
        return res.status(401).json({ message: "Owners not found!" })
    }
    if (await bcrypt.compare(req.body.currentPassword, admin.password)) {
        Owner.findOneAndUpdate({ _id: admin._id }, {
            $set: {
                username: req.body.username,
                password: newHash
            }
        })
            .then(() => {
                return res.status(200).json({ message: "Credential Update Successful" })
            })
    } else {
        return res.status(401).json({ message: "Credential Update Failed! Incorrect Password!" })
    }
}

exports.loginUser = async (req, res) => {
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


    if (!admin || req.body.username !== admin.username) {
        return res.status(401).json({ message: "Invalid username!" })
    }
    try {
        if (await bcrypt.compare(req.body.password, admin.password)) {
            const token = jwt.sign(
                { username: req.body.username, user_id: "1" },
                process.env.JWT_KEY,
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
        return res.status(401).json({ message: e.message})
    }
}