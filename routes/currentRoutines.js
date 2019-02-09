/*
 * GET current routines page.
 */

const data = require('../data.json');

exports.view = function (req, res) {
  res.render('currentRoutines', {
    navbarTitle: 'Current Routines',
    data
  });
};