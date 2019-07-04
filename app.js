
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'json'});
  res.write({auth:true});
  res.end();
}).listen(8080);



setInterval(function() {
    http.get("https://role-bot12.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
