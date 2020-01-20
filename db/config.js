const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'forfera35',
    database: 'realtor'
});

module.exports = connection;