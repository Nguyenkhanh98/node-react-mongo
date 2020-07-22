const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const priKeyFile = path.join(__dirname, '..', 'rsa_pri.pem');

const privateKey = fs.readFileSync(priKeyFile);

function issueJWT(user){
  const { _id } = user;
  const expiredIn = '7d';
  const payload = {
    sub: _id,
    iat: Date.now()
  }

  const signedToken = jwt.sign( payload, privateKey, {expiresIn: expiredIn, algorithm: 'RS256'} );
  return {
    token: signedToken,
    expires: expiredIn
  }
};

module.exports.issueJwt = issueJWT;
