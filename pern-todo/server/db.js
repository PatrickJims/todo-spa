const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'r#p@JIMS=100%',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;