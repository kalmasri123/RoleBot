const Discord = require('discord.js');
const client = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;

var request = require('request')
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'json'});
  res.write(JSON.stringify({auth:true}));
  res.end();
}).listen(8080);


