const mongoose = require('mongoose');

const catalogueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    fileUrl: { type: String, required: true },
    thumbnailUrl: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Catalogue', catalogueSchema);
