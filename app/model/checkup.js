var mongoose = require('mongoose'),
    mongooseActivityLog = require('./../plugin/mongoose-activity-log/mongoose-activity-log.js'),
    mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    patientId: String,
    doctorName: String,
    symptoms: String,
    diagnosis: String,
    checkupDate: Date,
    prescription: [{
        medicine: String,
        noOfDays: Number,
        whenToTake: String,
        beforeMeal: Boolean
    }],
    extraNotes: String,
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseActivityLog, {
    schemaName: "Checkup",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted"
});
module.exports = mongoose.model('Checkup', schema);