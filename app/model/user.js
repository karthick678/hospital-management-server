var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Users', new Schema({
	name: String,
	email: String,
	password: String,
	mobileNumber: String
}))
