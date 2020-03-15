const db = require("../database.js")
const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/build/bundle.js", function (request, response) {
  console.log('Looking in ' + __dirname + '/build/bundle.js')
  response.sendFile(__dirname + '/build/bundle.js');
});

app.get("/leaderboard", function (request, response) {
  page = {}
  var queryString = 'SELECT name, totalscience FROM users';
  db.query(queryString,(err, results, fields) =>
    {
      if (err) {
        return response.status(500).send('Error getting users');
      }else {
        Object.keys(results).forEach(function(key) {
          let row = results[key];
          console.log('row', row.name)
          page[row.name] = row.totalscience;
        });
        console.log(page);
      }
      return response.status(200).json(page);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
