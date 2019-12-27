const express = require('express');
const tmi = require("tmi.js");
const db = require("./database.js")
const fetch = require('node-fetch');
const passwordHash = require('password-hash');


function getUsers() {
  fetch("https://swapi.co/api/people/1/")
  .then(response => response.text())
  .then(result => {
    console.log(result);
    client.action('konstantinnovation', `Found ${result}`);
  })
  .catch(error => console.log('error', error));
}


function checkDB() {
  var queryString = 'SELECT * FROM users';
  let page = ""
  db.query(queryString,(err, results, fields) =>
    {
      if (err){
        return response.status(500).send('Error getting users');
      }else{
        Object.keys(results).forEach(function(key) {
          var row = results[key];
          page += row.name + ",";
        });
      }
      client.action('konstantinnovation', `Found ${page}`);
    });
}




// Setting options for our bot, disable debug output once your up and running.
let options = {
  identity: {
    username: "Innovation_Bot",
    password: "oauth:dzu6s1878y88781cobhdohi7yse2ld"
  },
    channels: ["konstantinnovation"]
};

// Set up our new TMI client and connect to the server.
let client =  new tmi.client(options);
client.connect();
// We have debug enabled now but if not we want some sort of confirmation
// we've connected to the server.
client.on('connected', (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

client.on("whisper", (from, userstate, message, self) => {
    // Don't listen to my own messages..
    if (self) return;

    let tokens = message.split(" ");
    console.log("from:",from);
    //console.log("XX:",userstate);
    console.log("message:",message);
    //console.log("XX:",tokens,tokens.length);
    // Do your stuff.


    switch(tokens[0]) {

      case '!password':
        if(tokens.length > 1){

          console.log("set password to",tokens[1]);
        }else{
          console.log("no string provided");
          client.whisper("username", "Your message");
        }
        break;
        case '!register':
          if(tokens.length > 1){

          }else{

          }
          break;
    }
});

// Bot is listening for messages
client.on('message', (channel, user, message, self) => {
  //if(self)return;
  console.log("from:",user);
  console.log("message:",message);
  switch(message) {
    case '!test':
      client.action('konstantinnovation', `Replying to ${user['display-name']}`);
      client.whisper(user.username, "test!").then(function(data) {
          console.log('data', data);
        }).catch(function(err) {
          console.log('something went wrong', err);
        });
      break;
    case '!users':
      getUsers();
      break;
    case '!dbTest':
      checkDB();
      break;
    default:
      break;
  }
})
