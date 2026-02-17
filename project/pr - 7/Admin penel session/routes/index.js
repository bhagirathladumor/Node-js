const express = require('express');
const router = express.Router();

// Import route modules
const adminRoutes = require('./admin.routes');
const categoryRoutes = require('./category.routes');
const subcategoryRoutes = require('./subcategory.routes');
const extracategoryRoutes = require('./extracategory.routes');
const productRoutes = require('./product.routes');

// Use route modules at root level
router.use('/', adminRoutes);
router.use('/', categoryRoutes);
router.use('/', subcategoryRoutes);
router.use('/', extracategoryRoutes);
router.use('/', productRoutes);

module.exports = router;