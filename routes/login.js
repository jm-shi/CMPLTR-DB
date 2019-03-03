/*
 * GET login page.
 */

const { User } = require('../models/user.js');

exports.view = function (req, res) {
  res.render('login', {
    navbarTitle: 'Log In'
  });
};

exports.loginUser = async function (req, res) {
  try {
    const user = await User.authenticateLogin(req.body.email, req.body.password);
    console.log('The user is', user);
    req.session._id = user._id;
    req.session.name = user.name;
    req.session.email = user.email;
    res.redirect('/home');
  } catch (err) {
    console.log('Failed to login', err);
  }
}
