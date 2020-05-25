const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('product_category', productCategorySchema);