const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRole('admin'), createProduct);

router
    .route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);
    

router.route('/products/:id').get(getProductDetails);

module.exports = router;