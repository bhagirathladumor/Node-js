const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/category/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/viewCategories', passport.checkAuthIsDone, categoryController.viewCategories);
router.get('/addCategory', passport.checkAuthIsDone, categoryController.addCategoryPage);
router.post('/addCategory', passport.checkAuthIsDone, upload.single('image'), categoryController.addCategory);
router.get('/editCategory/:id', passport.checkAuthIsDone, categoryController.editCategoryPage);
router.post('/updateCategory/:id', passport.checkAuthIsDone, upload.single('image'), categoryController.updateCategory);
router.get('/deleteCategory/:id', passport.checkAuthIsDone, categoryController.deleteCategory);

module.exports = router;
