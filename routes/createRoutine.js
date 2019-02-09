/*
 * GET create routine page.
 */

var data = require('../data.json');

exports.view = function (req, res) {
  res.render('createRoutine', {
    navbarTitle: 'Create Routine',
    data
  });
};

exports.addRoutine = function (req, res) {
  const title = req.body.title;
  const daysToComplete = req.body.daysToComplete;
  const goals = req.body.goals;
  const goalReward = req.body.goalReward;
  if (title && daysToComplete) {
    data.routines.push({
      title,
      daysToComplete,
      goals,
      goalReward
    });
    res.render('currentRoutines', {
      navbarTitle: 'Current Routines',
      data
    });
  }
}