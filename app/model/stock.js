var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: { type: String, unique: true },
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
    createAction: "Created",
    updateAction: "Updated",
    deleteAction: "Deleted"
});
module.exports = mongoose.model('Stock', schema);