const swagger = require('swagger-jsdoc');
const fs = require('fs');
const serverDev = {
	info: [{
		url: 'https://node-server-19720.herokuapp.com/api',
		description: 'production server'
	},
	{
		url: 'http://localhost:8080/api',
		description: 'dev server'
	}],
	fileName: 'dev_swagger.json'

};

const serverPro = {
	info: [{
		url: 'https://node-server-19720.herokuapp.com/api',
		description: 'production server'
	}],
	fileName: 'pro_swagger.json'

};
const servers = [serverDev, serverPro];

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'demo app',
		version: '1.0.0',
		contact: { email: 'nhkhanh998@gmail.com' }
	}

};

servers.forEach(currentValue => {
	const { info, fileName } = currentValue;
	swaggerDefinition.servers = info;
	const options = {
		swaggerDefinition,
		apis: ['./src/api/**/*.js']
	};
	const output = JSON.stringify(swagger(options), null, 2);

	fs.writeFileSync(fileName, output);
	process.stdout.write(`*** Generate ${fileName} successfully *** \n`);
});
