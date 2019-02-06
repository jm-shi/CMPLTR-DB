/*
 * GET current routines page.
 */

exports.view = function (req, res) {
  res.render('currentRoutines', {
    navbarTitle: 'Current Routines'
  });
};