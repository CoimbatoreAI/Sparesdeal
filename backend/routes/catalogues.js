const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogueController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');

const uploadDir = 'uploads/catalogues';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', auth, upload.single('file'), catalogueController.createCatalogue);
router.post('/request', catalogueController.requestCatalogue);
router.get('/', catalogueController.getCatalogues);
router.delete('/:id', auth, catalogueController.deleteCatalogue);

module.exports = router;
