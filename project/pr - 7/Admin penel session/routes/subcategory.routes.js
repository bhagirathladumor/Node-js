const express = require('express');
const router = express.Router();
const subcategoryController = require('../controller/subcategory.controller');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/subcategory/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/viewSubcategories', passport.checkAuthIsDone, subcategoryController.viewSubcategories);
router.get('/addSubcategory', passport.checkAuthIsDone, subcategoryController.addSubcategoryPage);
router.post('/addSubcategory', passport.checkAuthIsDone, upload.single('image'), subcategoryController.addSubcategory);
router.get('/editSubcategory/:id', passport.checkAuthIsDone, subcategoryController.editSubcategoryPage);
router.post('/updateSubcategory/:id', passport.checkAuthIsDone, upload.single('image'), subcategoryController.updateSubcategory);
router.get('/deleteSubcategory/:id', passport.checkAuthIsDone, subcategoryController.deleteSubcategory);

module.exports = router;
