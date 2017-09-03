var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: String,
    category: String,
    purchasePrice: Number,
    sellingPrice: Number,
    storeBox: String,
    Quantity: Number,
    company: String,
    effects: String,
    expireDate: Date
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Stock', schema);