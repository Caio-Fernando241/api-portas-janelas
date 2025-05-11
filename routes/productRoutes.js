const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, isManager } = require('../middlewares/auth');

router.get('/', productController.getProducts);
router.post('/', authenticate, isManager, productController.createProduct);

module.exports = router;