const Catalogue = require('../models/Catalogue');

exports.createCatalogue = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const fileUrl = req.file ? `/uploads/catalogues/${req.file.filename}` : null;

        if (!fileUrl) {
            return res.status(400).json({ message: 'Catalogue file is required' });
        }

        const catalogueData = {
            title,
            description,
            fileUrl
        };

        if (category && category.trim() !== "") {
            catalogueData.category = category;
        }

        const catalogue = new Catalogue(catalogueData);
        await catalogue.save();
        res.status(201).json(catalogue);
    } catch (error) {
        res.status(500).json({ message: 'Error creating catalogue', error: error.message });
    }
};

exports.getCatalogues = async (req, res) => {
    try {
        const catalogues = await Catalogue.find().populate('category').sort({ createdAt: -1 });
        res.json(catalogues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching catalogues', error: error.message });
    }
};

exports.deleteCatalogue = async (req, res) => {
    try {
        await Catalogue.findByIdAndDelete(req.params.id);
        res.json({ message: 'Catalogue deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting catalogue', error: error.message });
    }
};

const { sendCatalogueRequestEmail } = require('../utils/emailUtils');

exports.requestCatalogue = async (req, res) => {
    try {
        const { name, email, phone, companyName, companyAddress, catalogueTitle } = req.body;

        await sendCatalogueRequestEmail({
            name,
            email,
            phone,
            companyName,
            companyAddress,
            catalogueTitle
        });

        res.json({ message: 'Request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending request', error: error.message });
    }
};
