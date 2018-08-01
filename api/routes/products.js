var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../Models/Product');

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', function(req, res, next){
    var product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /products',
        product: product
    })
})

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); 
    })
})

router.patch('/:id', function(req, res, next){
    res.status(200).json({
        message: 'Updated product'
    })
})

router.delete('/:id', function(req, res, next){
    res.status(200).json({
        message: 'Deleted product'
    })
})

module.exports = router;