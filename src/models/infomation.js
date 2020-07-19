const mongoose = require('mongoose');

const User = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		index: true,
		unique: true
	},
	name: {
		type: String,
		required: [true, 'Please enter full name'],
		index: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'user'
	},
	phone: {
		type: String
	}
},
{ timestamps: true });

module.exports = mongoose.model('User', User);
