var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'Orders were fetched'
    })
})

router.post('/', function(req, res, next){
    res.status(201).json({
        message: 'Order was created'
    })
})

router.get('/:id', function(req, res, next){
    res.status(200).json({
        message: 'Orders details',
        orderId: req.params.id
    })
})

router.delete('/:id', function(req, res, next){
    res.status(200).json({
        message: 'Orders deleted',
        orderId: req.params.id
    })
})

module.exports = router;