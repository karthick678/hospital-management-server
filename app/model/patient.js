var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    dob: Date,
    gender: { type: String, required: true },
    address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        pincode: String
    },
    mobileNumber: { type: String, required: true },
    phoneNumber: String,
    bloodGroup: String,
    status: { type: Boolean, required: true }
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Patient",
    createAction: "Created",
    updateAction: "Updated",
    deleteAction: "Deleted"
});
module.exports = mongoose.model('Patient', schema);