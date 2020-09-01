const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(
  config.DB_URL, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err) => {
    if (err) {
      console.error(`MONGO connect encountered error =${err}`);
    } else {
      // Don't output DB url info before the @ symbol - i.e. credentials.
      console.log(`INFO: MONGO connected =${config.DB_URL.substring(config.DB_URL.indexOf('@'), config.DB_URL.length)}`);
    }
  }
);

module.exports = mongoose;