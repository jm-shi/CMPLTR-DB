const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    }
  },
  password: {
    type: String,
    required: true
  }
}, {
    timestamps: true
  })


const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
