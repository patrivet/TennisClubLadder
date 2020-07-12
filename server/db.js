const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URL, {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = mongoose;