const Product = require('../model/product.model');
const Category = require('../model/category.model');
const Subcategory = require('../model/subcategory.model');
const Extracategory = require('../model/extracategory.model');
const fs = require('fs');
const path = require('path');

module.exports.viewProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('extracategoryId')
            .sort({ createdAt: -1 });
        return res.render('goods/viewProduct', { products, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load products');
        return res.redirect('/dashboard');
    }
};

module.exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find({ status: 'active' });
        return res.render('goods/addProduct', { categories, currentPath: req.path, admin: req.user });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load page');
        return res.redirect('/viewProducts');
    }
};

module.exports.getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ 
            categoryId: req.params.categoryId, 
            status: 'active' 
        });
        return res.json({ success: true, subcategories });
    } catch (error) {
        return res.json({ success: false, message: 'Failed to load subcategories' });
    }
};

module.exports.getExtracategories = async (req, res) => {
    try {
        const extracategories = await Extracategory.find({ 
            subcategoryId: req.params.subcategoryId, 
            status: 'active' 
        });
        return res.json({ success: true, extracategories });
    } catch (error) {
        return res.json({ success: false, message: 'Failed to load extra categories' });
    }
};

module.exports.addProduct = async (req, res) => {
    try {
        const { title, categoryId, subcategoryId, extracategoryId, price, discount, description, stock, status } = req.body;

        const newProduct = {
            title,
            categoryId,
            subcategoryId,
            extracategoryId,
            price,
            discount: discount || 0,
            description,
            stock: stock || 0,
            status
        };
        
        if (req.files && req.files.length > 0) {
            newProduct.images = req.files.map(file => file.filename);
        }

        await Product.create(newProduct);
        req.flash('success', 'Product added successfully');
        return res.redirect('/viewProducts');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to add product');
        return res.redirect('/addProduct');
    }
};

module.exports.editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find({ status: 'active' });
        const subcategories = await Subcategory.find({ 
            categoryId: product.categoryId, 
            status: 'active' 
        });
        const extracategories = await Extracategory.find({ 
            subcategoryId: product.subcategoryId, 
            status: 'active' 
        });
        
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/viewProducts');
        }
        
        return res.render('goods/editProduct', { 
            product, 
            categories, 
            subcategories, 
            extracategories, 
            currentPath: req.path,
            admin: req.user
        });
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to load product');
        return res.redirect('/viewProducts');
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            const oldProduct = await Product.findById(req.params.id);
            
            if (oldProduct.images && oldProduct.images.length > 0) {
                oldProduct.images.forEach(img => {
                    const oldPath = path.join(__dirname, '..', 'uploads', 'product', img);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                });
            }
            
            updateData.images = req.files.map(file => file.filename);
        }

        await Product.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success', 'Product updated successfully');
        return res.redirect('/viewProducts');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to update product');
        return res.redirect('/viewProducts');
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (product && product.images && product.images.length > 0) {
            product.images.forEach(img => {
                const imagePath = path.join(__dirname, '..', 'uploads', 'product', img);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        }

        req.flash('success', 'Product deleted successfully');
        return res.redirect('/viewProducts');
    } catch (error) {
        console.log('Error:', error);
        req.flash('error', 'Failed to delete product');
        return res.redirect('/viewProducts');
    }
};
