const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.array('images', 10), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', auth, upload.array('images', 10), productController.updateProduct);
router.post('/:id/view', productController.incrementViewCount);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
