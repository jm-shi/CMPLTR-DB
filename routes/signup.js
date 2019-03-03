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

    req.session._id = user._id;
    req.session.name = user.name;
    req.session.first_name = user.name.trim().split(" ")[0];
    req.session.email = user.email;

    return res.redirect('/home');
  } catch (err) {
    res.status(400).send(err)
    return res.redirect('/home');
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