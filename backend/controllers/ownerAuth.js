const Owner = require('../models/owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.editCredentials = async (req, res) => {
    let newHash;
    await bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({
                message: 'CREDENTIAL UPDATE FAILED'
            })
        }
        newHash = hash
    })
    let admin;
    await Owner.find().then((result => {
        admin = result[0]
    }))
    if (!admin) {
        return res.status(401).json({ message: "OWNER NOT FOUND!" })
    }
    if (await bcrypt.compare(req.body.currentPassword, admin.password)) {
        Owner.findOneAndUpdate({ _id: admin._id }, {
            $set: {
                username: req.body.username,
                password: newHash
            }
        })
            .then(() => {
                return res.status(200).json({ message: "CREDENTIAL UPDATED SUCCESSFULLY!" })
            })
    } else {
        return res.status(401).json({ message: "CREDENTIAL UPDATE FAILED! INVALID PASSWORD!" })
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
        return res.status(401).json({ message: "INVALID USERNAME!" })
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
                    message: "LOG-IN SUCCESSFUL!",
                    token: token,
                    expiresIn: 3600 //1h
                }
            )
        } else {
            return res.status(401).json({ message: "INVALID PASSWORD!" })
        }
    } catch (e) {
        return res.status(401).json({ message: e.message})
    }
}