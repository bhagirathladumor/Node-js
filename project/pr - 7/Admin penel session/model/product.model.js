const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracategory',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    stock: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['available', 'out_of_stock', 'discontinued'],
        default: 'available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
