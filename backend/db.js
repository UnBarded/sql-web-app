const sql = require('mssql');

const config = {
  user: 'sql-web-app-admin',
  password: '7531234',
  server: 'localhost',
  database: 'fix_phone',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.log('DB Connection Failed:', err));

module.exports = {
  sql, poolPromise
};