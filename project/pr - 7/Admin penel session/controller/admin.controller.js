const Admin = require('../model/admin.model')
const Category = require('../model/category.model')
const Subcategory = require('../model/subcategory.model')
const Extracategory = require('../model/extracategory.model')
const Product = require('../model/product.model')
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path'); 

module.exports.dashborad = async (req, res) => {
    try {
        const totalAdmins = await Admin.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalSubcategories = await Subcategory.countDocuments();
        const totalExtracategories = await Extracategory.countDocuments();
        const totalProducts = await Product.countDocuments();
        
        return res.render('dashboard', { 
            currentPath: req.path,
            totalAdmins,
            totalCategories,
            totalSubcategories,
            totalExtracategories,
            totalProducts
        });
    } catch (error) {
        console.log('Error:', error);
        return res.render('dashboard', { 
            currentPath: req.path,
            totalAdmins: 0,
            totalCategories: 0,
            totalSubcategories: 0,
            totalExtracategories: 0,
            totalProducts: 0
        });
    }
}

module.exports.viewadmin = async (req, res) => {
    try {
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != req.user.email);
        return res.render('viewAdmin', { allAdmin, currentPath: req.path })
    } catch (error) {
        console.log("Error:", error);
        req.flash('error', 'Failed to load admins');
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    return res.render('addAdmin', { currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    console.log('Admin profile data:', req.user.profile);
    console.log('Full admin object:', req.user);
    return res.render('Profile/Profile', { currentPath: req.path })
}

module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });

        if (!myAdmin) {
            req.flash('error', 'Email not found in our records');
            return res.redirect('/');
        }

        let transporter = nodemailer.createTransporter({
            service: "gmail",
            auth: {
                user: "bhagirathladumor970@gmail.com",
                pass: "vpzfmneswgzcsxov"
            }
        });
        
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        await transporter.sendMail({
            from: '"Admin Panel" <bhagirathladumor970@gmail.com>',
            to: req.body.email,
            subject: "Password Reset OTP",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">Password Reset Request</h2>
                <p>Your OTP for password reset is:</p>
                <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #2563eb; border-radius: 8px;">
                    ${OTP}
                </div>
                <p style="color: #666;">This OTP will expire in 10 minutes.</p>
            </div>
            `
        });

        req.session.OTP = OTP;
        req.session.resetUserId = myAdmin._id;
        req.session.otpExpiry = Date.now() + 600000; // 10 minutes

        req.flash('success', 'OTP sent to your email');
        return res.redirect('/Otp-Page');

    } catch (error) {
        console.log('Email verification error:', error);
        req.flash('error', 'Failed to send OTP. Please try again.');
        return res.redirect('/');
    }
}

module.exports.otpPage = async (req, res) => {
    try {
        if (!req.session.OTP || !req.session.resetUserId || Date.now() > req.session.otpExpiry) {
            req.flash('error', 'OTP expired or invalid session');
            return res.redirect('/');
        }
        return res.render('auth/otpPage');
    } catch (error) {
        console.log('Something Went Wrong', error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
    }
}

module.exports.VerifyOtp = async (req, res) => {
    try {
        if (!req.session.OTP || Date.now() > req.session.otpExpiry) {
            req.flash('error', 'OTP expired');
            return res.redirect('/');
        }

        if (req.body.OTP !== req.session.OTP) {
            req.flash('error', 'Invalid OTP. Please try again.');
            return res.redirect('/Otp-Page');
        }

        delete req.session.OTP;
        delete req.session.otpExpiry;
        req.flash('success', 'OTP verified successfully');
        return res.redirect('/forgot-pass');

    } catch (error) {
        console.log('OTP verification error:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/Otp-Page');
    }
}

module.exports.forgotPasswordPage = async (req, res) => {
    try {
        if (!req.session.resetUserId) {
            req.flash('error', 'Invalid session');
            return res.redirect('/');
        }
        return res.render('auth/forgotPass');
    } catch (error) {
        console.log('Something Went Wrong', error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/');
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        if (!req.session.resetUserId) {
            req.flash('error', 'Invalid session');
            return res.redirect('/');
        }

        if (req.body.newPass !== req.body.ConfPass) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/forgot-pass');
        }

        const updatePassword = await Admin.findByIdAndUpdate(
            req.session.resetUserId,
            { password: req.body.newPass },
            { new: true }
        );

        delete req.session.resetUserId;

        if (updatePassword) {
            req.flash('success', 'Password updated successfully. Please login.');
            return res.redirect('/');
        } else {
            req.flash('error', 'Failed to update password');
            return res.redirect('/forgot-pass');
        }

    } catch (err) {
        console.log('Password reset error:', err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/forgot-pass');
    }
}

module.exports.changePasswordPage = async (req, res) => {
    return res.render('auth/changePassPage', { currentPath: req.path })
}

module.exports.changePassword = async (req, res) => {
    try {
        const { currentPass, newPass, ConfPass } = req.body;

        if (currentPass != req.user.password) {
            req.flash('error', 'Current password is incorrect');
            return res.redirect('/change-password')
        }

        if (newPass === req.user.password) {
            req.flash('error', 'New password cannot be same as current password');
            return res.redirect('/change-password')
        }

        if (ConfPass != newPass) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/change-password')
        }

        await Admin.findByIdAndUpdate(req.user._id, { password: newPass }, { new: true });
        req.flash('success', 'Password changed successfully');
        return res.redirect('/logout')

    } catch (error) {
        console.log("Error:", error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/change-password');
    }
}

module.exports.loginPage = async (req, res) => {
    return res.render('auth/login')
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('Logout error:', err);
        }
        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    });
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Login successful');
    return res.redirect('/dashboard');
}

module.exports.addAdmin = async (req, res) => {
    try {
        console.log('File uploaded:', req.file);
        console.log('Body data:', req.body);
        
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) {
            req.flash('error', 'Admin with this email already exists');
            return res.redirect('/addAdmin');
        }

        const newAdmin = req.body

        if (req.file) {
            newAdmin.profile = req.file.filename;
            console.log('Profile image saved as:', req.file.filename);
        }

        const createdAdmin = await Admin.create(newAdmin);
        console.log('Admin created:', createdAdmin);
        req.flash('success', 'Admin added successfully');
        return res.redirect('/viewAdmin');

    } catch (error) {
        console.log('Add admin error:', error);
        req.flash('error', 'Failed to create admin. Please try again.');
        return res.redirect('/addAdmin');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const adminToEdit = await Admin.findById(req.params.id);
        if (!adminToEdit) {
            req.flash('error', 'Admin not found');
            return res.redirect('/viewAdmin');
        }
        
        return res.render('editAdmin', { 
            adminToEdit, 
            currentPath: req.path,
            req: req
        });
    } catch (error) {
        console.log('Edit admin page error:', error);
        req.flash('error', 'Failed to load admin details');
        return res.redirect('/viewAdmin');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        const updateData = req.body

        if (req.file) {
   const oldAdmin = await Admin.findById(req.params.id);

   if (oldAdmin.profile) {
      const oldPath = path.join(
        __dirname, "..", "uploads", "admin", oldAdmin.profile
      );

      if (fs.existsSync(oldPath)) {
         fs.unlinkSync(oldPath);
      }
   }

   updateData.profile = req.file.filename;
}

        await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        
        req.flash('success', 'Admin updated successfully');
        const returnTo = req.query.returnTo || '/viewAdmin';
        return res.redirect(returnTo);

    } catch (error) {
        console.log('Update admin error:', error);
        req.flash('error', 'Failed to update admin');
        return res.redirect('/viewAdmin');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

        if (deletedAdmin && deletedAdmin.profile) {
            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                "admin",
                deletedAdmin.profile
            );

            console.log("Trying to delete:", imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log("Image deleted successfully");
            } else {
                console.log("Image NOT found at:", imagePath);
            }
        }

        req.flash('success', 'Admin deleted successfully');
        return res.redirect('/viewAdmin');

    } catch (error) {
        console.log('Delete admin error:', error);
        req.flash('error', 'Failed to delete admin');
        return res.redirect('/viewAdmin');
    }
};
