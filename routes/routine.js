/*
 * GET routine page.
 */

var data = require('../data.json');

exports.viewCurrentRoutine = function (req, res) {
  const id = req.params.id;

  const currentRoutineData = data.routines.find(function (routine) {
    return routine.id === id;
  });

  console.log('Current routine data:', currentRoutineData);

  res.render('currentRoutine', {
    navbarTitle: 'Current Routine',
    currentRoutineData
  });
};
