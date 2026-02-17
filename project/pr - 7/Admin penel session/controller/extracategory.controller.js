const Extracategory = require('../model/extracategory.model');
const Subcategory = require('../model/subcategory.model');
const Category = require('../model/category.model');
const fs = require('fs');
const path = require('path');

module.exports.viewExtracategories = async (req, res) => {
    try {
        const extracategories = await Extracategory.find()
            .populate('categoryId')
            .populate('subcategoryId')
            .sort({ createdAt: -1 });
        return res.render('addons/viewExtracategory', { extracategories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load extra categories');
        return res.redirect('/dashboard');
    }
};

module.exports.addExtracategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('addons/addExtracategory', { categories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load page');
        return res.redirect('/viewExtracategories');
    }
};

module.exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ 
            categoryId: req.params.categoryId
        });
        return res.json({ success: true, subcategories });
    } catch (error) {
        console.log('Error:', error);
        return res.json({ success: false, message: 'Failed to load subcategories' });
    }
};

module.exports.addExtracategory = async (req, res) => {
    try {
        const { name, categoryId, subcategoryId } = req.body;

        const newExtracategory = { name, categoryId, subcategoryId };
        
        if (req.file) {
            newExtracategory.image = req.file.filename;
        }

        await Extracategory.create(newExtracategory);
        req.flash('success', 'Extra category added successfully');
        return res.redirect('/viewExtracategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to add extra category');
        return res.redirect('/addExtracategory');
    }
};

module.exports.editExtracategoryPage = async (req, res) => {
    try {
        const extracategory = await Extracategory.findById(req.params.id);
        const categories = await Category.find();
        const subcategories = await Subcategory.find({ 
            categoryId: extracategory.categoryId
        });
        
        if (!extracategory) {
            req.flash('error', 'Extra category not found');
            return res.redirect('/viewExtracategories');
        }
        
        return res.render('addons/editExtracategory', { 
            extracategory, 
            categories, 
            subcategories, 
            currentPath: req.path,
            admin: req.user
        });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load extra category');
        return res.redirect('/viewExtracategories');
    }
};

module.exports.updateExtracategory = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.file) {
            const oldExtracategory = await Extracategory.findById(req.params.id);
            if (oldExtracategory.image) {
                const oldPath = path.join(__dirname, '..', 'uploads', 'extracategory', oldExtracategory.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.image = req.file.filename;
        }

        await Extracategory.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success', 'Extra category updated successfully');
        return res.redirect('/viewExtracategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to update extra category');
        return res.redirect('/viewExtracategories');
    }
};

module.exports.deleteExtracategory = async (req, res) => {
    try {
        const extracategory = await Extracategory.findByIdAndDelete(req.params.id);
        
        if (extracategory && extracategory.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'extracategory', extracategory.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        req.flash('success', 'Extra category deleted successfully');
        return res.redirect('/viewExtracategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to delete extra category');
        return res.redirect('/viewExtracategories');
    }
};
