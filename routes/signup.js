/*
 * GET signup page.
 */

const { User } = require('../models/user.js');

exports.view = function (req, res) {
  res.render('signup', {
    navbarTitle: 'Sign Up'
  });
};

exports.createUser = async function (req, res) {
  const user = new User(req.body);
  try {
    await user.save()
    res.status(201).send(user);
    return res.redirect('/home');
  } catch (err) {
    if (err.code === 11000) {
      res.render('signup', {
        navbarTitle: 'Sign Up',
        signedUpWithDuplicateEmail: true
      });
    } else {
      res.status(400).send(err)
    }
  }
}

exports.verifyEmailUnique = function (req, res) {
  const email = req.params.email;
  User.findOne({ email }, function (err, user) {
    if (user) {
      res.send('email already exists');
    } else {
      res.send('email does not exist');
    }
  });
}