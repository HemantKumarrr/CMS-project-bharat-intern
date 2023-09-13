const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String,
    name: String,
    user_img : String
});

module.exports = mongoose.model('products', productSchema);