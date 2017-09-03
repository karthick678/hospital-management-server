var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    dob: Date,
    gender: String,
    address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        pincode: String
    },
    mobileNumber: String,
    phoneNumber: String,
    bloodGroup: String
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Patient', schema);
