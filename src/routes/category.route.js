const express = require('express');
const { categoryController } = require('../controllers');

const router = express.Router();

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories);

router
  .route('/:categoryId')
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategoryById);

module.exports = router;
