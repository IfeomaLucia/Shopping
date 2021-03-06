var Product = require('../Models/Product');

var mongoose = require('mongoose');
var multer = require('multer');

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

exports.getAllProducts = function(req, res, next){
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
                   productImage: doc.productImage,
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
}

exports.addProduct = function(req, res, next){
    var product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
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
}

exports.getProductById = function(req, res, next){
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
}

exports.updateProduct = function(req, res, next){
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
}

exports.deleteProduct = function(req, res, next){
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
}