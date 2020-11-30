const mongoose = require('mongoose');
const Product = mongoose.model('Product');
var ObjectId = mongoose.Types.ObjectId;

function handleError(res, reason, message, code){
    console.log("ERROR: ", reason);
    res.status(code || 500).json({"error": message});
}

module.exports.create = (req, res, next) => {
    delete req.body._id;
    var product = new Product(req.body);
    product.userId = req._id;
    product.user = req.user;
    product.save( (err, doc) => {
        if(err) return handleError(res, err.message, 'Faild to create product');
        return res.status(201).json(doc);
    } );
}
module.exports.products = (req, res, next) => {
    Product.find((err, docs) => {
        if(err) return handleError(res, err.message, 'Faild to get products');
        return res.status(200).json(docs);
    });
}
module.exports.product = (req, res, next) => {
    if(!ObjectId.isValid(req.params._id)) return handleError(res, 'Invalide ObjectID', 400);
    Product.findById(rea.params._id, (err, doc) => {
        if(err) return handleError(res, req.message, 'Faild to get product');
    } );
}
module.exports.update = (req, res, next) => {

}
module.exports.delete = (req, res, next) => {

}
