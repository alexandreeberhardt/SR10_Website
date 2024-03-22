const mysql = require("mysql");
const config = require("../config.js");

const pool = mysql.createPool({
    host: config.dbhost, 
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
});

module.exports = pool;
