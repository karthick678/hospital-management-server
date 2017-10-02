var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        middle: String,
        last: String
    },
    email: { type: String, unique: true, required: true },
    gender: { type: String, required: true },
    mobileNumber: { type: String, unique: true, required: true },
    phoneNumber: String,
    status: { type: Boolean, required: true },
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Doctor",
    createAction: "Created",
    updateAction: "Updated",
    deleteAction: "Deleted"
});
module.exports = mongoose.model('Doctor', schema);