const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'product_category',
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('product', productSchema);