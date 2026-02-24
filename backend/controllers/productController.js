const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

exports.createProduct = async (req, res) => {
    try {
        const productData = { ...req.body };

        // Clean up empty strings and handle objects for ObjectId fields
        if (productData.category === "" || productData.category === "[object Object]") delete productData.category;
        else if (productData.category && typeof productData.category === 'object') productData.category = productData.category._id;

        if (productData.subCategory === "" || productData.subCategory === "[object Object]") delete productData.subCategory;
        else if (productData.subCategory && typeof productData.subCategory === 'object') productData.subCategory = productData.subCategory._id;

        if (productData.marketPrice === "") delete productData.marketPrice;
        if (productData.offerPrice === "") delete productData.offerPrice;
        if (productData.stock === "") delete productData.stock;

        if (req.files) {
            productData.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Handle specifications if passed as stringified JSON
        if (req.body.specifications) {
            try {
                const parsed = typeof req.body.specifications === 'string'
                    ? JSON.parse(req.body.specifications)
                    : req.body.specifications;
                // Double parse if it's still a string (happens if frontend stringifies twice)
                productData.specifications = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
            } catch (err) {
                console.error("Error parsing specifications:", err);
                delete productData.specifications; // Remove the invalid string to avoid Mongoose casting error
            }
        } else {
            delete productData.specifications;
        }

        // Handle isFeatured boolean conversion
        if (req.body.isFeatured !== undefined) {
            productData.isFeatured = req.body.isFeatured === 'true';
        }

        // Handle external links from flattened form data
        productData.externalLinks = {
            amazon: req.body.amazonLink || "",
            flipkart: req.body.flipkartLink || "",
            indiamart: req.body.indiamartLink || ""
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category subCategory');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category subCategory');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productData = { ...req.body };

        // Clean up empty strings and handle objects for ObjectId fields
        if (productData.category === "" || productData.category === "[object Object]") delete productData.category;
        else if (productData.category && typeof productData.category === 'object') productData.category = productData.category._id;

        if (productData.subCategory === "" || productData.subCategory === "[object Object]") delete productData.subCategory;
        else if (productData.subCategory && typeof productData.subCategory === 'object') productData.subCategory = productData.subCategory._id;

        if (productData.marketPrice === "") delete productData.marketPrice;
        if (productData.offerPrice === "") delete productData.offerPrice;
        if (productData.stock === "") delete productData.stock;

        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Handle specifications if passed as stringified JSON
        if (req.body.specifications) {
            try {
                const parsed = typeof req.body.specifications === 'string'
                    ? JSON.parse(req.body.specifications)
                    : req.body.specifications;
                productData.specifications = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
            } catch (err) {
                console.error("Error parsing specifications:", err);
                delete productData.specifications;
            }
        }

        // Handle isFeatured boolean conversion
        if (req.body.isFeatured !== undefined) {
            productData.isFeatured = req.body.isFeatured === 'true';
        }

        // Handle external links from flattened form data
        if (req.body.amazonLink !== undefined || req.body.flipkartLink !== undefined || req.body.indiamartLink !== undefined) {
            productData.externalLinks = {
                amazon: req.body.amazonLink || "",
                flipkart: req.body.flipkartLink || "",
                indiamart: req.body.indiamartLink || ""
            };
        }

        const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        // Optional: delete files from disk
        if (product && product.images) {
            product.images.forEach(img => {
                const filePath = path.join(__dirname, '..', img);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.incrementViewCount = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ viewCount: product.viewCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
