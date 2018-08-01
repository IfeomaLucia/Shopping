var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', function(req, res, next){
    var product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: 'Handling POST requests to /products',
        product: product
    })
})

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        })
    }else{
        res.status(200).json({
           message: 'You passed an ID' 
        })
    }
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