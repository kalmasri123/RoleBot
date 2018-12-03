const scoreKeeper = require('./scorekeeping.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;




client.on('message', msg => {

      let args = msg.content.split(" ");

      if (args[0] == "%assign") {
        //args[1]=channel
        //args[2]= name

        if (args.length == 3) {
          if (client.channels.find("name", args[1])) {

            message.channel.send("**Done**")
          } else {
            msg.channel.send("**Can't find that channel!**")

            }
          }
        } else {
          msg.channel.send("**Not the right amount of arguments\n Correct Usage: \n ```%assign channelname rolename```")
        }



      })
