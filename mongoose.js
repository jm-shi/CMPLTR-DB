const mongoose = require('mongoose');

function connect(callback) {
  mongoose.connect(process.env.MONGODB_URL, {
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
