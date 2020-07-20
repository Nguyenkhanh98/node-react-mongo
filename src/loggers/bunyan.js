const bunyan = require('bunyan');

const log = bunyan.createLogger({
name: 'myapp',
streams: [
  {
    level: 'info',
    stream: process.stdout,
  },
  {
    level: 'error',
    path: 'myapp-error.log',
  }
]
});

module.exports=log;
