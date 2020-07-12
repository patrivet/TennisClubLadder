require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const DB_URL = process.env.DB_URL;

module.exports = {
  PORT,
  HOST,
  DB_URL
}
