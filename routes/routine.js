let currentRoutines = require('../currentRoutines.json');
let previousRoutines = require('../previousRoutines.json');

exports.viewCreateRoutine = function(req, res) {
  res.render('createRoutine', {
    navbarTitle: 'Create Routine',
    currentRoutines
  });
};

exports.addRoutine = function(req, res) {
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
  if (title && daysToComplete) {
    currentRoutines.routines.push({
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

    return res.redirect('/currentRoutines');
  }
};

exports.viewEditRoutine = function(req, res) {
  const id = req.params.id;
  const currentRoutineData = currentRoutines.routines.find(function(routine) {
    return routine.id === id;
  });
  res.render('editRoutine', {
    navbarTitle: 'Edit Routine',
    currentRoutineData
  });
};

exports.editRoutine = function(req, res) {
  const id = req.params.id;
  const allRoutines = currentRoutines.routines;
  allRoutines.some(function(routine) {
    if (routine.id === id) {
      routine.title = req.body.title;
      routine.daysToComplete = req.body.daysToComplete;
      routine.alarm = req.body.alarm;
      routine.repeatMonday = req.body.repeatMonday;
      routine.repeatTuesday = req.body.repeatTuesday;
      routine.repeatWednesday = req.body.repeatWednesday;
      routine.repeatThursday = req.body.repeatThursday;
      routine.repeatFriday = req.body.repeatFriday;
      routine.repeatSaturday = req.body.repeatSaturday;
      routine.repeatSunday = req.body.repeatSunday;
      routine.everyOtherDay = req.body.everyOtherDay;
      routine.goals = req.body.goals;
      routine.goalReward = req.body.goalReward;
    }
  });

  return res.redirect('/currentRoutines');
};

exports.deleteRoutine = function(req, res) {
  const id = req.params.id;
  currentRoutines.routines = currentRoutines.routines.filter(function(routine) {
    return routine.id !== id;
  });
  return res.redirect('/currentRoutines');
};

exports.updateCompletionLog = function(req, res) {
  console.log('Update completion log', req.body);

  const index = req.body.index;
  const isComplete = req.body.isComplete === 'on' ? 1 : 0;
  const id = req.params.id;
  const allRoutines = currentRoutines.routines;

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

  const currentRoutineData = currentRoutines.routines.find(function(routine) {
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
    currentRoutines
  });
};

exports.viewAllPreviousRoutines = function(req, res) {
  res.render('previousRoutines', {
    navbarTitle: 'Previous Routines',
    previousRoutines
  });
};
