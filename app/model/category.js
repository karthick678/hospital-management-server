var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: String,
    status: Boolean,
    description: String
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', schema);