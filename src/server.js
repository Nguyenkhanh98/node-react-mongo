const restify = require('restify');

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
