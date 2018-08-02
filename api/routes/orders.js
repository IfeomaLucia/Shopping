var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Order = require('../Models/Order');
var Product = require('../Models/Product'); 

router.get('/', function(req, res, next){
    Order.find()
    .select('-__v')
    .populate('productId', '-__v')
    .exec()
    .then(docs => {
        var response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    productId: doc.productId,
                    quantity: doc.quantity,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', function(req, res, next){
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        var order = new Order({
            _id: mongoose.Types.ObjectId(),
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        return order.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    productId: result.productId,
                    quantity: result.quantity,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                }
            });
        })
    })
    .catch(err => {
         res.status(500).json({
             message: 'Product not found',
             error: err
         })
    })
})

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    Order.findById(id)
    .select('-__v')
    .populate('productId', '-__v')
    .exec()
    .then(order => {
        if (!order) {
            res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/'
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); 
    })
})

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Order.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders/',
                body: {productId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;