var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../Models/Product');

router.get('/', function(req, res, next){
   Product.find()
   .select('-__v')
   .exec()
   .then(docs => {
       var response = {
           count: docs.length,
           products: docs.map(doc => {
               return {
                   name: doc.name,
                   price: doc.price,
                   _id: doc._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:3000/products/' + doc._id
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
    var product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .select('-__v')
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Creation of product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
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
    .select('-__v')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'
                }
            });
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
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
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

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products/',
                body: {name: 'String', price: 'Number'}
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