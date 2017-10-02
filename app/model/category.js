var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: { type: String, unique: true },
    status: Boolean,
    description: String
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Category",
    createAction: "Created",
    updateAction: "Updated",
    deleteAction: "Deleted"
});
module.exports = mongoose.model('Category', schema);