const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');
const auth = require('../middleware/auth');

router.post('/', auth, subCategoryController.createSubCategory);
router.get('/', subCategoryController.getSubCategories);
router.put('/:id', auth, subCategoryController.updateSubCategory);
router.delete('/:id', auth, subCategoryController.deleteSubCategory);

module.exports = router;
