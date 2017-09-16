var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    email: String,
    gender: String,
    mobileNumber: String,
    phoneNumber: String,
    status: Boolean
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Doctor', schema);