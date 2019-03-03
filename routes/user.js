const { User } = require('../models/user.js');

exports.getUserInfo = async function (req, res) {
  User.findOne({ email: req.params.email }, function (err, user) {
    if (err) {
      return console.log(err);
    }
    res.send(user);
  })
}
