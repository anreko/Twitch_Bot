const mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : "192.168.1.14",
  user            : 'twitchbot',
  password        : 'm1nut35s',
  database        : 'twitchdb'
});

module.exports = {
  query: (text, callback) => {
    //console.log('executing query', text);
    return pool.query(text, callback);
  },
};
