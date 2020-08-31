const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(
  config.DB_URL, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err) => {
    if (err) {
      console.error(`MONGO connect encountered error =${err}`);
    } else {
      console.log(`INFO: MONGO connected =${config.DB_URL}`);
    }
  }
);

module.exports = mongoose;