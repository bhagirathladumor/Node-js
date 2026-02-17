const Category = require('../model/category.model');
const fs = require('fs');
const path = require('path');

module.exports.viewCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.render('items/viewCategory', { categories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load categories');
        return res.redirect('/dashboard');
    }
};

module.exports.addCategoryPage = async (req, res) => {
    return res.render('items/addCategory', { currentPath: req.path, admin: req.user });
};

module.exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            req.flash('error', 'Category already exists');
            return res.redirect('/addCategory');
        }

        const newCategory = { name };
        
        if (req.file) {
            newCategory.image = req.file.filename;
        }

        await Category.create(newCategory);
        req.flash('success', 'Category added successfully');
        return res.redirect('/viewCategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to add category');
        return res.redirect('/addCategory');
    }
};

module.exports.editCategoryPage = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/viewCategories');
        }
        return res.render('items/editCategory', { category, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load category');
        return res.redirect('/viewCategories');
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.file) {
            const oldCategory = await Category.findById(req.params.id);
            if (oldCategory.image) {
                const oldPath = path.join(__dirname, '..', 'uploads', 'category', oldCategory.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.image = req.file.filename;
        }

        await Category.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success', 'Category updated successfully');
        return res.redirect('/viewCategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to update category');
        return res.redirect('/viewCategories');
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        
        if (category && category.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'category', category.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        req.flash('success', 'Category deleted successfully');
        return res.redirect('/viewCategories');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to delete category');
        return res.redirect('/viewCategories');
    }
};
