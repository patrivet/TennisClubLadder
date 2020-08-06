require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  PORT,
  HOST,
  DB_URL,
  SECRET_KEY,
}
