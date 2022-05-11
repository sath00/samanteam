const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const storeInfo = require('../models/storeinfo')

router.get('/details', (req, res)=>{    
  storeInfo.find()
      .then((result) => {
          res.status(200).json(result);
      }).catch((err) => {
          res.status(400).json({
              error: err._message
          })
      })
})

router.put('/update', (req, res) => {
    storeInfo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {
        $set: {
            telephone: req.body.telephone,
            cellphone: req.body.cellphone,
            streetAdd: req.body.streetAdd,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            details: req.body.details
        }
    }, { upsert: false })
        .then(result => {
            res.status(200).json({
                message: "Store Information Updated successfully!"
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