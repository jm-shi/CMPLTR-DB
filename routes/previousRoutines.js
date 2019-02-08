/*
 * GET previous routines page.
 */

exports.view = function (req, res) {
  res.render('previousRoutines', {
    navbarTitle: 'Previous Routines'
  });
};