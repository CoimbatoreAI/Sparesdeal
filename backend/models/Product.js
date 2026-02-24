const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    marketPrice: { type: Number, required: true },
    offerPrice: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    images: [{ type: String }], // Array for multiple images
    stock: { type: Number, default: 0 },
    specifications: { type: Map, of: String },
    isFeatured: { type: Boolean, default: false },
    externalLinks: {
        amazon: { type: String, default: "" },
        flipkart: { type: String, default: "" },
        indiamart: { type: String, default: "" }
    },
    viewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
