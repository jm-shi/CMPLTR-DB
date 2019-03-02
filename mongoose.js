const mongoose = require('mongoose');
const validator = require('validator');

let database;

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
    const db = client;
    database = db;
    callback();
  });
};

function get() {
  return database;
}

function close() {
  database.close();
}

module.exports = {
  connect,
  get,
  close
};
