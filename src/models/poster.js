const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Poster = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please enter title'],
		lowercase: true
	},
	image: {
		type: String
	},
	description: {
		type: String

	},
	user_id: {
		type: ObjectId
	},
	is_deleted: {
		type: String,
		required: true,
		default: false
	}

},
{ timestamps: true });

mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('Poster', Poster);
