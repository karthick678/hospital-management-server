var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: String,
    status: Boolean,
    description: String
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Category",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted"
});
module.exports = mongoose.model('Category', schema);