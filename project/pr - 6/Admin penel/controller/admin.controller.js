const Admin = require('../model/admin.model')
const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports.dashborad = async (req, res) => {
    const admin = req.admin;
    return res.render('dashboard', { admin, currentPath: req.path });
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = req.admin;
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('viewAdmin', { allAdmin, admin, currentPath: req.path })
    } catch (error) {
        console.log("Error:", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    const admin = req.admin;
    return res.render('addAdmin', { admin, currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    const admin = req.admin;
    console.log('Admin profile data:', admin.profile);
    console.log('Full admin object:', admin);
    return res.render('Profile/Profile', { admin, currentPath: req.path })
}

module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });

        if (!myAdmin) {
            return res.render('auth/login', { error: 'Email not found in our records' });
        }

        let transporter = nodemailer.createTransport({
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

        res.cookie("OTP", OTP, { maxAge: 600000 });
        res.cookie("id", myAdmin._id, { maxAge: 600000 });

        return res.redirect('/Otp-Page');

    } catch (error) {
        console.log('Email verification error:', error);
        return res.render('auth/login', { error: 'Failed to send OTP. Please try again.' });
    }
}

module.exports.otpPage = async (req, res) => {
    try {
        if (!req.cookies.OTP || !req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/otpPage');
    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.VerifyOtp = async (req, res) => {
    try {
        if (req.body.OTP !== req.cookies.OTP) {
            return res.render('auth/otpPage', { error: 'Invalid OTP. Please try again.' });
        }

        res.clearCookie('OTP');
        return res.redirect('/forgot-pass');

    } catch (error) {
        console.log('OTP verification error:', error);
        return res.render('auth/otpPage', { error: 'Something went wrong. Please try again.' });
    }
}

module.exports.forgotPasswordPage = async (req, res) => {
    try {
        if (!req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/forgotPass');
    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        if (!req.cookies.id) {
            return res.redirect('/');
        }

        if (req.body.newPass !== req.body.ConfPass) {
            return res.render('auth/forgotPass', { error: 'Passwords do not match' });
        }

        const updatePassword = await Admin.findByIdAndUpdate(
            req.cookies.id,
            { password: req.body.newPass },
            { new: true }
        );

        res.clearCookie('id');
        res.clearCookie('OTP');

        if (updatePassword) {
            return res.render('auth/login', { success: 'Password updated successfully. Please login.' });
        } else {
            return res.render('auth/forgotPass', { error: 'Failed to update password' });
        }

    } catch (err) {
        console.log('Password reset error:', err);
        return res.render('auth/forgotPass', { error: 'Something went wrong. Please try again.' });
    }
}

module.exports.changePasswordPage = async (req, res) => {
    const admin = req.admin;
    return res.render('auth/changePassPage', { admin, currentPath: req.path })
}

module.exports.changePassword = async (req, res) => {
    try {
        const admin = req.admin;
        const { currentPass, newPass, ConfPass } = req.body;

        if (currentPass != admin.password) {
            return res.redirect('/change-password')
        }

        if (newPass === admin.password) {
            return res.redirect('/change-password')
        }

        if (ConfPass != newPass) {
            return res.redirect('/change-password')
        }

        await Admin.findByIdAndUpdate(admin._id, { password: newPass }, { new: true });
        return res.redirect('/')

    } catch (error) {
        console.log("Error:", error);
        return res.redirect('/');
    }
}

module.exports.loginPage = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId && admin) {
        return res.redirect('/dashboard');
    }
    return res.render('auth/login')
}

module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

module.exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        
        if (!admin) {
            return res.render('auth/login', { error: 'Invalid email or password' });
        }
        
        if (admin.password !== req.body.password) {
            return res.render('auth/login', { error: 'Invalid email or password' });
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');

    } catch (error) {
        console.log('Login error:', error);
        return res.render('auth/login', { error: 'Something went wrong. Please try again.' });
    }
}

module.exports.addAdmin = async (req, res) => {
    try {
        console.log('File uploaded:', req.file);
        console.log('Body data:', req.body);
        
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.render('addAdmin', { 
                admin: req.admin, 
                currentPath: req.path,
                error: 'Admin with this email already exists' 
            });
        }

        const newAdmin = req.body

        if (req.file) {
            newAdmin.profile = req.file.filename;
            console.log('Profile image saved as:', req.file.filename);
        }

        const createdAdmin = await Admin.create(newAdmin);
        console.log('Admin created:', createdAdmin);
        return res.redirect('/viewAdmin');

    } catch (error) {
        console.log('Add admin error:', error);
        return res.render('addAdmin', { 
            admin: req.admin, 
            currentPath: req.path,
            error: 'Failed to create admin. Please try again.' 
        });
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const adminToEdit = await Admin.findById(req.params.id);
        if (!adminToEdit) {
            return res.redirect('/viewAdmin');
        }
        
        return res.render('editAdmin', { 
            admin: req.admin, 
            adminToEdit, 
            currentPath: req.path,
            req: req
        });
    } catch (error) {
        console.log('Edit admin page error:', error);
        return res.redirect('/viewAdmin');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        const updateData = req.body

        if (req.file) {
            updateData.profile = req.file.filename;
        }

        await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        
        const returnTo = req.query.returnTo || '/viewAdmin';
        return res.redirect(returnTo);

    } catch (error) {
        console.log('Update admin error:', error);
        return res.redirect('/viewAdmin');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        
        if (deletedAdmin && deletedAdmin.profile) {
            const imagePath = `uploads/${deletedAdmin.profile}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        return res.redirect('/viewAdmin');
    } catch (error) {
        console.log('Delete admin error:', error);
        return res.redirect('/viewAdmin');
    }
}