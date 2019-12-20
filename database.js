const { Pool } = require('pg');
// const PG_URI = '192.168.1.14:5432';
const PG_URI = 'postgres://gzovzqyx:7HFXvadDCi9rq6h9oazNpcGr9FaQ7y-i@raja.db.elephantsql.com:5432/gzovzqyx';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
