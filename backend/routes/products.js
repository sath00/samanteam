const express = require('express');
const multer = require('multer')
const router = express.Router();
const { checkToken } = require('../authentication/authentication')
const productController = require('../controllers/products')



const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

//api for deleting products
router.delete('/remove/:id',checkToken, productController.deleteProduct)

//api for adding product (original)
router.post('/add', checkToken, multer({ storage: storage }).single('image'), productController.addProduct )

//this is the api for marking products as sold out or available
router.post('/availability', checkToken, productController.updateAvailability)

//this is the api for getting the products in the database
router.get('/list', productController.getProducts)

//api for editing details in product
router.put("/edit/:id", checkToken, multer({ storage: storage }).single('image'), productController.updateProduct)

module.exports = router;