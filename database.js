const { Pool } = require('pg');
const PG_URI = '192.168.1.14:5432';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

//Cat db columns: _id, name, img, fish, cost
//Users db columns: _id, username, password, fishes, cat_1 - cat_4


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
