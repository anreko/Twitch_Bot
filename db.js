const mysql = require('mysql');
var conn  = mysql.createConnection({
  host: "192.168.1.14",
  user: 'twitchbot',
  password: 'm1nut35s',
  database: 'twitchdb',
});

conn.connect();



const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
// import { test } from "./dbtest.js";

// Glitch expects a web server so we're starting express to take care of that.
// The page shows the same information as the readme and includes the remix button.
app.get("/", function (request, response) {
  response.send("It's working!?");
});

app.get("/database", function (request, response) {
  var queryString = 'SELECT * FROM users';
  conn.query(queryString, function(err, results, fields) {
      if (err){
        console.log('Error getting users from database');
        return response.status(500).send('Error getting users');
      }else{
        console.log('Results: ',results)
        let page = ""
        Object.keys(results).forEach(function(key) {
          var row = results[key];
          console.log(row.name,row.email)
          page += row.name + row.email+"<br>";
        });
        return response.status(200).send(results+"<br>"+page);
      }
  });
});


app.get("/adduser", function (request, response) {
  var queryString = 'INSERT into users (name,email) VALUES ("vampy","vamp@py.com")';
  conn.query(queryString, function(err, results, fields) {
      if (err){
        console.log('Error getting users from database');
        return response.status(500).send('inserting user');
      }else{
        console.log('Results: ',results);

        return response.status(200).send(results);
      }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
