var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: String,
    category: String,
    status: Boolean,
    price: String,
    qty: String,
    genericName: String,
    company: String,
    effects: String,
    effects: String,
    expireDate: Date,
    description: String
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Stock', schema);
