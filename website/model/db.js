var mysql = require("mysql");
var pool = mysql.createPool({
    host: "lchappuis.fr", //ou localhost
    user: "sr10",
    password: "sr10",
    database: "testsr10"
});
module.exports = pool;