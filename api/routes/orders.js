var express = require('express');
var router = express.Router();


var orderController = require('../Controllers/OrderController');

router.get('/', orderController.getAllOrders);

router.post('/', orderController.addOrder);

router.get('/:id', orderController.getOrderById);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;