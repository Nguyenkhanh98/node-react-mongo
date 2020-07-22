const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const genKeyPair = () => {
	const keyPair = crypto.generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem'
		}
	});
	fs.writeFileSync(path.join(__dirname, 'rsa_pub.pem'), keyPair.publicKey);

	fs.writeFileSync(path.join(__dirname, 'rsa_pri.pem'), keyPair.privateKey);
};
genKeyPair();
