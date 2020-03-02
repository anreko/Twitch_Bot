const db = require("../database.js")
const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/build/bundle.js", function (request, response) {
  response.sendFile(__dirname + '/build/bundle.js');
});

app.get("/database", function (request, response) {
  page = ""
  var queryString = 'SELECT * FROM users';
  db.query(queryString,(err, results, fields) =>
    {
      if (err){
        return response.status(500).send('Error getting users');
      }else{
        Object.keys(results).forEach(function(key) {
          var row = results[key];
          page += row.name + row.totalscience+"<br>";
        });
        console.log(results);
      }
      return response.status(200).send(page);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
