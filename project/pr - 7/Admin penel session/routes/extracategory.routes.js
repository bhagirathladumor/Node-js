const express = require('express');
const router = express.Router();
const extracategoryController = require('../controller/extracategory.controller');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/extracategory/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/viewExtracategories', passport.checkAuthIsDone, extracategoryController.viewExtracategories);
router.get('/addExtracategory', passport.checkAuthIsDone, extracategoryController.addExtracategoryPage);
router.post('/addExtracategory', passport.checkAuthIsDone, upload.single('image'), extracategoryController.addExtracategory);
router.get('/editExtracategory/:id', passport.checkAuthIsDone, extracategoryController.editExtracategoryPage);
router.post('/updateExtracategory/:id', passport.checkAuthIsDone, upload.single('image'), extracategoryController.updateExtracategory);
router.get('/deleteExtracategory/:id', passport.checkAuthIsDone, extracategoryController.deleteExtracategory);
router.get('/api/subcategories/:categoryId', passport.checkAuthIsDone, extracategoryController.getSubcategoriesByCategory);

module.exports = router;
