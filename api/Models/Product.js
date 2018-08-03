var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productImage:{type: String, required:true}, 
    name: {type: String, required: true},
    price: {type: Number, required: true} 
})

module.exports = mongoose.model('Product', productSchema);