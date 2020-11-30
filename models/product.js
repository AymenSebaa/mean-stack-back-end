const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    title: {
        type: String,
        required: 'Product title is required'
    },
    category: {
        type: String,
        required: 'Product category is required'
    },
    images: {
        type: [String],
        required: 'Product need at least one picture'
    },
    desc: {
        type: String,
        required: 'Product description is required'
    },
    price: {
        type: Number,
        required: 'Product price is required'
    },
    tags: {
        type: [String],
        required: 'Product need at least one tag'
    },
    userId: {
        type: String,
        required: 'Product needs a seller'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);