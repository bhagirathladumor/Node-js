const Subcategory = require('../model/subcategory.model');
const Category = require('../model/category.model');
const fs = require('fs');
const path = require('path');

module.exports.viewSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId').sort({ createdAt: -1 });
        return res.render('subitems/viewSubcategory', { subcategories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load subcategories');
        return res.redirect('/dashboard');
    }
};

module.exports.addSubcategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('subitems/addSubcategory', { categories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load page');
        return res.redirect('/viewSubcategories');
    }
};

module.exports.addSubcategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        const newSubcategory = { name, categoryId };
        
        if (req.file) {
            newSubcategory.image = req.file.filename;
        }

        await Subcategory.create(newSubcategory);
        req.flash('success', 'Subcategory added successfully');
        return res.redirect('/viewSubcategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to add subcategory');
        return res.redirect('/addSubcategory');
    }
};

module.exports.editSubcategoryPage = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        const categories = await Category.find();
        
        if (!subcategory) {
            req.flash('error', 'Subcategory not found');
            return res.redirect('/viewSubcategories');
        }
        
        return res.render('subitems/editSubcategory', { subcategory, categories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load subcategory');
        return res.redirect('/viewSubcategories');
    }
};

module.exports.updateSubcategory = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.file) {
            const oldSubcategory = await Subcategory.findById(req.params.id);
            if (oldSubcategory.image) {
                const oldPath = path.join(__dirname, '..', 'uploads', 'subcategory', oldSubcategory.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.image = req.file.filename;
        }

        await Subcategory.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success', 'Subcategory updated successfully');
        return res.redirect('/viewSubcategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to update subcategory');
        return res.redirect('/viewSubcategories');
    }
};

module.exports.deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
        
        if (subcategory && subcategory.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'subcategory', subcategory.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        req.flash('success', 'Subcategory deleted successfully');
        return res.redirect('/viewSubcategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to delete subcategory');
        return res.redirect('/viewSubcategories');
    }
};
