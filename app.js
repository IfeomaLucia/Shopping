var express = require('express'); 
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var productRouter = require('./api/routes/products');
var orderRouter = require('./api/routes/orders');

//Middleware function
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
})

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