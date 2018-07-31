var express = require('express'); 
var app = express();

var productRouter = require('./routes/products');

app.use('/products', productRouter);

module.exports = app;