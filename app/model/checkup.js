var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
  mongoosePaginate = require('mongoose-paginate'),
  patient = require('./patient'),
  doctor = require('./doctor'),
  stock = require('./stock');

var schema = Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'patient'
  },
  symptoms: String,
  diagnosis: String,
  checkupDate: Date,
  prescription: [{
    noOfDays: Number,
    whenToTake: String,
    beforeMeal: Boolean,
    stockId: {
      type: Schema.Types.ObjectId,
      ref: 'stock'
    }
  }],
  extraNotes: String,
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'doctor'
  }
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
  schemaName: "Checkup",
  createAction: "Created",
  updateAction: "Updated",
  deleteAction: "Deleted"
});
module.exports = mongoose.model('Checkup', schema);
