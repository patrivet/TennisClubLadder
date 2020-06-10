const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tennisClubLadders', {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
module.exports = mongoose;