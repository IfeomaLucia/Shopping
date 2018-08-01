var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', function(req, res, next){
    res.status(200).json({
        message: 'Handling POST requests to /products'
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