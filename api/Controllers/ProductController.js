
exports.getproducts = function(req, res, next){
    res.status(200).json({
        message: 'The GET request for the products'
    })
}
exports.addproducts = function(req, res, next){
    res.status(200).json({
        message: 'The POST request for the products'
    })
}

exports.updateProduct = function(req, res){
    var id = req.params.id;
}

exports.deleteProduct = function(req, res){
    var id = req.params.id;
    n
}