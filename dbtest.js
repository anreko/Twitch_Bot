const mysql = require('mysql');
const pool = mysql.createPool({
  user: 'twitchbot',
  password: 'm1nut35s',
  database: 'twitchdb',
  host: "192.168.1.14"
})
// const connection = mysql.createConnection(options)

pool.getConnection((err, connection) => {
  if (err) {
    console.error('An error occurred while connecting to the DB')
    throw err
  }
  // console.log("Connected!");
})

// ! This query will return data correctly
// console.log(connection.query('SELECT * FROM users', function (error, results, fields) {
//   if (error) {
//     console.error('An error occurred while executing the query', error)
//     throw error
//   }
//   return console.log("FROM DB TEST", results) }))



const test = {query: (text, function (error, x, fields) {
  if (error) {
    console.error('An error occurred while executing the query')
    throw error
  }
  return console.log("FROM DB TEST", x) })}

module.exports = test;

// {
//   query: (test, function (error, results, fields) {
//       if (error) {
//         console.error('An error occurred while executing the query', error)
//         throw error
//       }
//       return console.log("FROM DB TEST", error, results, fields)
//     })
// }