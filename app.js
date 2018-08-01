var express = require('express'); 
var app = express();

var productRouter = require('./api/routes/products');
//var orderRouter = require('./routes/orders');

app.use('/products', productRouter);
//app.use('/orders', orderRouter);

module.exports = app;