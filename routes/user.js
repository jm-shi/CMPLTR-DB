const { User } = require('../models/user.js');

exports.getUserInfo = async function (req, res) {
  User.findOne({ email: req.params.email }, function (err, user) {
    if (err) {
      return console.log(err);
    }
    res.send(user);
  })
}

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/login');
}