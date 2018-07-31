var express = require('express');
var router = express.Router();
var productController = require('../api/Controllers/ProductController');

router.get('/', productController.getproducts);
router.post('/add', productController.addproducts);
router.patch('/update/:id', productController.updateProduct);
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;
