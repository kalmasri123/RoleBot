var http = require('https');

http.createServer(function (req, res) {
  // add a HTTP header:
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT,8080);




setInterval(function() {
    http.get("https://role-bot12.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
