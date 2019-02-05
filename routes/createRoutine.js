/*
 * GET create routine page.
 */

exports.view = function (req, res) {
  res.render('createRoutine', {
    navbarTitle: 'Create Routine'
  });
};