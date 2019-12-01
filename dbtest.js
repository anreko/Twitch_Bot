const mysql = require('mysql');
const options = {
  user: 'twitchbot',
  password: 'm1nut35s',
  database: 'twitchdb',
  host: "192.168.1.14"
}
const connection = mysql.createConnection(options)

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB')
    throw err
  }
  console.log("Connected!");
})

connection.query('SELECT * FROM users', (error, x, fields) => {
  if (error) {
    console.error('An error occurred while executing the query')
    throw error
  }
  console.log(x)
})
