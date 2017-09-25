var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
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
schema.plugin(mongooseActivityLog, {
    schemaName: "Doctor",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted"
});
module.exports = mongoose.model('Doctor', schema);