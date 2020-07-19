const mongoose = require('mongoose');
const configs = require('../configs');
const logs = require('../loggers/winston');

module.exports = async () => {
	const dbConnection = await mongoose.connect(configs.dbHost, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	mongoose.set('useCreateIndex', true);
	return dbConnection.connection.db;
};
