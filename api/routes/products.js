var express = require('express');
var router = express.Router();
var multer = require('multer');

var checkAuth = require('../middleware/check-auth')
var productController = require('../Controllers/ProductController');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

// var filefilter = function(req, file, cb){
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true);
//             }else{
//                 cb(null, false)
//             }
// }
var upload = multer({storage: storage});

router.get('/', productController.getAllProducts);

router.post('/', checkAuth, upload.single('productImage'), productController.addProduct)

router.get('/:id', checkAuth, productController.getProductById);

router.patch('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;