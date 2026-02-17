const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/product/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/viewProducts', passport.checkAuthIsDone, productController.viewProducts);
router.get('/addProduct', passport.checkAuthIsDone, productController.addProductPage);
router.post('/addProduct', passport.checkAuthIsDone, upload.array('images', 5), productController.addProduct);
router.get('/editProduct/:id', passport.checkAuthIsDone, productController.editProductPage);
router.post('/updateProduct/:id', passport.checkAuthIsDone, upload.array('images', 5), productController.updateProduct);
router.get('/deleteProduct/:id', passport.checkAuthIsDone, productController.deleteProduct);
router.get('/api/subcategories/:categoryId', passport.checkAuthIsDone, productController.getSubcategories);
router.get('/api/extracategories/:subcategoryId', passport.checkAuthIsDone, productController.getExtracategories);

module.exports = router;
