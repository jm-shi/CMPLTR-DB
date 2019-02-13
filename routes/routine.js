var data = require('../data.json');

exports.viewCreateRoutine = function(req, res) {
  res.render('createRoutine', {
    navbarTitle: 'Create Routine',
    data
  });
};

exports.addRoutine = function(req, res) {
  console.log('the req body is', req.body);
  const id = req.body.id;
  const createdAt = req.body.createdAt;
  const title = req.body.title;
  const daysToComplete = req.body.daysToComplete;
  let completionChart = [];
  for (let i = 0; i < daysToComplete; i++) completionChart.push(0);
  const alarm = req.body.alarm;
  const repeatMonday = req.body.repeatMonday;
  const repeatTuesday = req.body.repeatTuesday;
  const repeatWednesday = req.body.repeatWednesday;
  const repeatThursday = req.body.repeatThursday;
  const repeatFriday = req.body.repeatFriday;
  const repeatSaturday = req.body.repeatSaturday;
  const repeatSunday = req.body.repeatSunday;
  const everyOtherDay = req.body.everyOtherDay;
  const goals = req.body.goals;
  const goalReward = req.body.goalReward;
  console.log(req.body);
  if (title && daysToComplete) {
    data.routines.push({
      id,
      createdAt,
      title,
      daysToComplete,
      completionChart,
      alarm,
      repeatMonday,
      repeatTuesday,
      repeatWednesday,
      repeatThursday,
      repeatFriday,
      repeatSaturday,
      repeatSunday,
      everyOtherDay,
      goals,
      goalReward
    });
    res.render('currentRoutines', {
      navbarTitle: 'Current Routines',
      data
    });
  }
};

exports.viewEditRoutine = function(req, res) {
  const id = req.params.id;
  const currentRoutineData = data.routines.find(function(routine) {
    return routine.id === id;
  });
  res.render('editRoutine', {
    navbarTitle: 'Edit Routine',
    currentRoutineData
  });
};

exports.updateCompletionLog = function(req, res) {
  console.log('Update completion log', req.body);

  const index = req.body.index;
  const isComplete = req.body.isComplete === 'on' ? 1 : 0;
  const id = req.params.id;
  const allRoutines = data.routines;

  const currentRoutineData = allRoutines.find(function(routine) {
    return routine.id === id;
  });

  for (let i = 0; i < allRoutines.length; i++) {
    if (allRoutines[i].id === id) {
      allRoutines[i].completionChart[index] = isComplete;
      break;
    }
  }

  console.log('Current routine data:', currentRoutineData);

  res.render('currentRoutine', {
    navbarTitle: 'Current Routine',
    currentRoutineData
  });
};

exports.viewCurrentRoutine = function(req, res) {
  const id = req.params.id;

  const currentRoutineData = data.routines.find(function(routine) {
    return routine.id === id;
  });

  console.log('Current routine data:', currentRoutineData);

  res.render('currentRoutine', {
    navbarTitle: 'Current Routine',
    currentRoutineData
  });
};

exports.viewAllCurrentRoutines = function(req, res) {
  res.render('currentRoutines', {
    navbarTitle: 'Current Routines',
    data
  });
};

exports.viewAllPreviousRoutines = function(req, res) {
  res.render('previousRoutines', {
    navbarTitle: 'Previous Routines'
  });
};
