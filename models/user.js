const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  });

UserSchema.statics.authenticateLogin = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found', 30);
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) throw new Error('Incorrect password')
  return user;
}

// Hash password before saving it to database
UserSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, 8)
  next()
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
