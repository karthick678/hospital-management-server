var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate'),
    category = require('./category');

var schema = Schema({
    name: { type: String, unique: true },
    status: Boolean,
    price: String,
    qty: String,
    genericName: String,
    company: String,
    effects: String,
    effects: String,
    expireDate: Date,
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category'
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Stock",
    createAction: "Created",
    updateAction: "Updated",
    deleteAction: "Deleted"
});
module.exports = mongoose.model('Stock', schema);
