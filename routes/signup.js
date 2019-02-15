/*
 * GET signup page.
 */

exports.view = function (req, res) {
  res.render('signup', {
    navbarTitle: 'Sign Up'
  });
};