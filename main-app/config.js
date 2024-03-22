const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbhost: process.env.DATABASE_HOST,
  dbname: process.env.DATABASE_NAME,
  dbuser: process.env.DATABASE_USER,
  dbpassword: process.env.DATABASE_PASSWORD,
};