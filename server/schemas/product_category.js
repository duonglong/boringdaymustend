const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    description: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('product_category', productCategorySchema);