var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../Models/Product');

router.get('/', function(req, res, next){
   Product.find()
   .exec()
   .then(docs => {
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch()
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
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry for provided Id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); 
    })
})

router.patch('/:id', function(req, res, next){
    var id = req.params.id;
    var updateOps = {};
    for(var ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}) 

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;