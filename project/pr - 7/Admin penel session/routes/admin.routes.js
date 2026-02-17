const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const passport = require('passport');
const upload = require('../middleware/multer.middleware');

// Auth routes
router.get('/', passport.checkAuthIsNotDone, adminController.loginPage);
router.post('/login', passport.checkAuthIsNotDone, passport.authenticate("localAuth", {
    failureRedirect: "/",
    failureFlash: true
}), adminController.login);
router.get('/logout', passport.checkAuthIsDone, adminController.logout);

// Forgot password routes
router.post('/verify-email', passport.checkAuthIsNotDone, adminController.verifyEmail);
router.get('/Otp-Page', passport.checkAuthIsNotDone, adminController.otpPage);
router.post('/verify-otp', passport.checkAuthIsNotDone, adminController.VerifyOtp);
router.get('/forgot-pass', passport.checkAuthIsNotDone, adminController.forgotPasswordPage);
router.post('/forgot-password', passport.checkAuthIsNotDone, adminController.forgotPassword);

// Dashboard and admin management routes (protected)
router.get('/dashboard', passport.checkAuthIsDone, adminController.dashborad);
router.get('/profile', passport.checkAuthIsDone, adminController.profile);
router.get('/viewAdmin', passport.checkAuthIsDone, adminController.viewadmin);
router.get('/addAdmin', passport.checkAuthIsDone, adminController.addAdminPage);
router.post('/addAdmin', passport.checkAuthIsDone, upload.single('profile'), adminController.addAdmin);
router.get('/deleteAdmin/:id', passport.checkAuthIsDone, adminController.deleteAdmin);
router.get('/editAdmin/:id', passport.checkAuthIsDone, adminController.editAdmin);
router.post('/updateAdmin/:id', passport.checkAuthIsDone, upload.single('profile'), adminController.updateAdmin);

// Password change routes (protected)
router.get('/change-password', passport.checkAuthIsDone, adminController.changePasswordPage);
router.post('/change-password', passport.checkAuthIsDone, adminController.changePassword);

module.exports = router;

module.exports = router;