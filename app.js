
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'json'});
  res.write({auth:true});
  res.end();
}).listen(8080);


