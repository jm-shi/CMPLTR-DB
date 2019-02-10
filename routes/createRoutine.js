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
  const id = req.body.id;
  const createdAt = req.body.createdAt;
  const title = req.body.title;
  const daysToComplete = req.body.daysToComplete;
  const alarm = req.body.alarm;
  const repeatMonday = req.body.repeatMonday;
  const repeatTuesday = req.body.repeatTuesday;
  const repeatWednesday = req.body.repeatWednesday;
  const repeatThursday = req.body.repeatThursday;
  const repeatFriday = req.body.repeatFriday;
  const repeatSaturday = req.body.repeatSaturday;
  const repeatSunday = req.body.repeatSunday;
  const goals = req.body.goals;
  const goalReward = req.body.goalReward;
  console.log(req.body);
  if (title && daysToComplete) {
    data.routines.push({
      id,
      createdAt,
      title,
      daysToComplete,
      alarm,
      repeatMonday,
      repeatTuesday,
      repeatWednesday,
      repeatThursday,
      repeatFriday,
      repeatSaturday,
      repeatSunday,
      goals,
      goalReward,
    });
    res.render('currentRoutines', {
      navbarTitle: 'Current Routines',
      data
    });
  }
};
