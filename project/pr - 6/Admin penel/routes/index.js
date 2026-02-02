const express = require('express');
const router = express.Router();

// Import route modules
const adminRoutes = require('./admin.routes');

// Use route modules at root level
router.use('/', adminRoutes);

module.exports = router;