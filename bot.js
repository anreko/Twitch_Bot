const express = require('express');
const tmi = require("tmi.js");
const db = require("./database.js")
const fetch = require('node-fetch');
const passwordHash = require('password-hash');

function hash(s){
  return passwordHash.generate(s);
}


//!check
function check(user,s){
  getPassword(user,function(err,foo){
    if(err){
      console.log("error checking pass",err);
    }else{
      console.log("password authentication:",passwordHash.verify(s,foo));
   }
   });
}

//!showme
function showStats(user){
  getUserData(user,function(err,foo){
    if(err){
      console.log("error getting user",err);
      return null;
    }else{
      console.log("userdata:",foo);
      s = "Stats ---";
      for (const property in foo) {
        if(property!='password'){
          s+= property+" :\t"+ foo[property]+" --- ";
        }
      }
      client.action('konstantinnovation',s);
      return foo;
   }
   });
}


function getUserData(user,callback){
  var queryString = `SELECT * from twitchdb.users WHERE name = '${user}';`
  db.query(queryString,(err, results, fields) =>
      {
        if (err){
          console.log("err in getpass:",err);
          callback(err,null);
        }else{
          console.log("returning:",results[0]);
          callback(err,results[0]);
      }});
}

function getPassword(user,callback){
  var queryString = `SELECT password from twitchdb.users WHERE name = '${user}';`
  db.query(queryString,(err, results, fields) =>
      {
        if (err){
          console.log("err in getpass:",err);
          callback(err,null);
        }else{
          console.log("returning:",results[0].password);
          callback(err,results[0].password);
      }});
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







function setPassword(user,pass){
  var queryString = `UPDATE twitchdb.users SET password = "${pass}" WHERE name = "${user}";`
  db.query(queryString,(err, results, fields) =>
      {
        if (err){
          console.log("error setting password")
          console.log(err);
        }else{
          client.action('konstantinnovation', `Successfully updated ${user}'s password.`);
      }});
}


function changePass(user,pass){
  let hashedPassword = hash(pass);
  getPassword(user,function(err,foo){
    if(err){
      console.log("error checking pass",err);
    }else{
      console.log('changing pass',foo,'to',hashedPassword)
    }
  });
  setPassword(user,hashedPassword);
}



function addUser(username){
  var queryString = 'INSERT INTO `twitchdb`.`users` (`name`) VALUES ("'+username+'");';
  db.query(queryString,(err, results, fields) =>
      {
        if (err){
          client.action('konstantinnovation', `Error. You have already registered ${username}. You don't need to do it again!`);
        }else{
          client.action('konstantinnovation', `Successfully registered ${username}. using !unregister will completely delete your account and all progress made so far.`);
      }});
}

client.on("whisper", (from, userstate, message, self) => {
    // Don't listen to my own messages..
    if (self) return;
    //console.log("from:",from);
    //console.log("message:",message);

    let tokens = message.split(" ");
    // Do your stuff.

    switch(tokens[0]) {
      case '!check':
        if(tokens.length > 1){
          check(userstate.username,tokens[1]);
        }

       break;
      //set a password
      case '!password':
        if(tokens.length > 1){
          changePass(userstate.username,tokens[1]);
        }else{
            console.log("no string provided");
        }
        break;
    }
});

// Bot is listening for messages
client.on('message', (channel, user, message, self) => {
  //ignore self
  if(self)return;

  let tokens = message.split(" ");
  //console.log("message:",message);
  //console.log("from:",user);
  //console.log("message:",message);
  switch(tokens[0]) {

    case '!test':
      client.action('konstantinnovation', `Replying to ${user['display-name']}`);
      break;

    case '!showme':
      showStats(user.username);
      break;

    case '!register':
      //add yourself to database
      addUser(user.username)

    default:
      break;
  }
})
