var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
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
schema.plugin(mongooseActivityLog, {
    schemaName: "Stock",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted"
});
module.exports = mongoose.model('Stock', schema);