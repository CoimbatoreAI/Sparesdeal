const SubCategory = require('../models/SubCategory');

exports.createSubCategory = async (req, res) => {
    try {
        const subCategoryData = { ...req.body };
        if (subCategoryData.category === "") delete subCategoryData.category;

        const subCategory = new SubCategory(subCategoryData);
        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSubCategory = async (req, res) => {
    try {
        const subCategoryData = { ...req.body };
        if (subCategoryData.category === "") delete subCategoryData.category;

        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, subCategoryData, { new: true });
        res.json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subcategory deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
