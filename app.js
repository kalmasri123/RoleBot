const Discord = require('discord.js');
const client = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://localhost:27017'

MongoClient.connect(url, function(err, db) {
  var dbo = db.db("db");
  dbo.listCollections().toArray(function(err, collInfos) {
      // collInfos is an array of collection info objects that look like:
      // { name: 'test', options: {} }
      console.log(collInfos)
  });


})
client.on('guildCreate', guild => {

  let id = guild.id;
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("db");

    dbo.createCollection(id.toString(), function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });


  })


})

client.on('guildMemberAdd', member => {

      member.guild.fetchInvites()
        .then(function(invites) {
          MongoClient.connect(url, function(err, db) {
            var dbo = db.db("mydb");
            console.log(member.guild.id)
            dbo.collection(member.guild.id.toString()).find().toArray(function(err, invs) {
              console.log(invs)
                for (var key in invs) {

                  let DBUSES = invs[key].uses
                  let DISC_USES = invites.find(invite => invite.code == invs[key].invite).uses
                  if (DBUSES != DISC_USES) {
                    //assign role
                    member.addRole(invs[key].role)
                  }
                  var newvalues = {
                    $set: {
                      uses: DISC_USES
                    }
                  };
                  console.log("hello")
                  dbo.collection(member.guild.id).updateOne({
                    role: invs[key].role
                  }, newvalues, function(err, res) {
                    if (err) throw err;

                    console.log("1 document updated");

                    db.close()

                  })

                }}


              )
            }




          )

        }).catch(console.error)
      })
      client.on('message', msg => {

        let args = msg.content.split(" ");

        if (args[0] == "%assign") {
          //args[1]=channel
          //args[2]= name
          //Goals: add role to database along with tied invitation
          //Check for newcomers.

          if (args.length == 3) {

            let err = [0, 0]
            msg.guild.fetchInvites()
              .then(function(invites) {

                let code = args[2].split("/")
                if (invites.find(invite => invite.code == code[code.length - 1])) {
                  msg.guild.createRole({
                      name: args[1],
                      color: 'BLUE',
                    })
                    .then(role => {

                      MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("mydb");
                        var myobj = {
                          invite: code[code.length - 1],
                          role: role.id,
                          uses: invites.find(invite => invite.code == code[code.length - 1]).uses
                        };

                        dbo.collection(msg.guild.id.toString()).insertOne(myobj, function(err, res) {
                          if (err) throw err;
                          console.log("1 document inserted");
                          db.close();
                        });
                      });
                    })
                    .catch(console.error)



                } else {
                  msg.channel.send("**The Invite doesn't exist!**")
                }

              })
              .catch(console.error);

          }





        }
      })
      client.login("MjkyMDI2ODc5ODE5MzgyNzg0.Dub4YQ.0heVbdCt-TQ2UREc2cu4iDzhaiE")
