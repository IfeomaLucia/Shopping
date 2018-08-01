var express = require('express'); 
var app = express();
var morgan = require('morgan');

var productRouter = require('./api/routes/products');
var orderRouter = require('./api/routes/orders');

//Middleware function
app.use(morgan('dev'));

//Routes for requests
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(function(req, res, next){
    var error = new Error('Url not found');
    error.status = 404;
    next(error);
})

app.use(function(error, req, res, next){
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;