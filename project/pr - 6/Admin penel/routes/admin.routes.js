const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const multer = require('multer');
const path = require('path');
const Admin = require('../model/admin.model');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Auth middleware
const authMiddleware = async (req, res, next) => {
    try {
        if (req.cookies.adminId) {
            const admin = await Admin.findById(req.cookies.adminId);
            if (admin) {
                req.admin = admin;
                return next();
            }
        }
        return res.redirect('/');
    } catch (error) {
        return res.redirect('/');
    }
};

// Auth routes
router.get('/', adminController.loginPage);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);
router.post('/verify-email', adminController.verifyEmail);
router.get('/Otp-Page', adminController.otpPage);
router.post('/verify-otp', adminController.VerifyOtp);
router.get('/forgot-pass', adminController.forgotPasswordPage);
router.post('/forgot-password', adminController.forgotPassword);

// Dashboard and admin management routes (protected)
router.get('/dashboard', authMiddleware, adminController.dashborad);
router.get('/profile', authMiddleware, adminController.profile);
router.get('/viewAdmin', authMiddleware, adminController.viewadmin);
router.get('/addAdmin', authMiddleware, adminController.addAdminPage);
router.post('/addAdmin', authMiddleware, upload.single('profile'), adminController.addAdmin);
router.get('/deleteAdmin/:id', authMiddleware, adminController.deleteAdmin);
router.get('/editAdmin/:id', authMiddleware, adminController.editAdmin);
router.post('/updateAdmin/:id', authMiddleware, upload.single('profile'), adminController.updateAdmin);

// Password change routes (protected)
router.get('/change-password', authMiddleware, adminController.changePasswordPage);
router.post('/change-password', authMiddleware, adminController.changePassword);

module.exports = router;