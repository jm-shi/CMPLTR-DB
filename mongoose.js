const mongoose = require('mongoose');

function connect(callback) {
  mongoose.connect('mongodb://127.0.0.1:27017/cmpltr-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, function (err, client) {
    if (err) {
      console.log('Could not connect to MongoDB', err);
    }
    console.log('Connected to MongoDB');
    callback();
  });
};

module.exports = {
  connect
};
