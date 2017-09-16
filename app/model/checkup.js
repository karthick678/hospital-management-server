var mongoose = require('mongoose'),
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
module.exports = mongoose.model('Checkup', schema);