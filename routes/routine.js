let currentRoutines = require('../currentRoutines.json');
let previousRoutines = require('../previousRoutines.json');

exports.addRoutine = function (req, res) {
  const id = req.body.id;
  const createdAt = req.body.createdAt;
  const title = req.body.title;
  const daysCompleted = 0;
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
  const everyDay = (!repeatSunday && !repeatMonday && !repeatTuesday && !repeatWednesday
    && !repeatThursday && !repeatFriday) || (repeatSunday && repeatMonday
      && repeatTuesday && repeatWednesday && repeatThursday && repeatFriday && repeatSaturday);
  const everyOtherDay = req.body.everyOtherDay;

  let goals = req.body.goals;
  goals = goals.split(",");
  // Remove leading and trailing spaces
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].trim();
  }
  // Exclude last goal if it's an empty string
  if (goals[goals.length - 1].trim() === "") goals.pop();
  // Capitalize first letter of each item in goals array
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].charAt(0).toUpperCase() + goals[i].substr(1);
  }

  const goalReward = req.body.goalReward;
  if (title && daysToComplete) {
    currentRoutines.routines.push({
      id,
      createdAt,
      title,
      daysCompleted,
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
      everyDay,
      everyOtherDay,
      goals,
      goalReward
    });

    return res.redirect('/currentRoutines');
  }
};

exports.completeRoutine = function (req, res) {
  const id = req.params.id;
  const completedGoalsCount = parseInt(req.body.completedGoalsCount);
  let goalsArray = req.body.goalsArray;
  if (goalsArray) {
    goalsArray = goalsArray.map(function (item) {
      return {
        goal: item.goal,
        completed: parseInt(item.completed)
      }
    });
  }

  // Add routine to previous routine
  const routineToMove = currentRoutines.routines.find(function (routine) {
    return routine.id === id;
  });
  routineToMove.completedGoalsCount = completedGoalsCount;
  routineToMove.goalsArray = goalsArray;
  previousRoutines.routines.push(routineToMove);

  // Delete routine from current routine
  currentRoutines.routines = currentRoutines.routines.filter(function (routine) {
    return routine.id !== id;
  });

  res.render('currentRoutines', {
    navbarTitle: 'Current Routine',
    currentRoutines
  });
};

exports.deletePreviousRoutine = function (req, res) {
  const id = req.params.id;
  previousRoutines.routines = previousRoutines.routines.filter(function (
    routine
  ) {
    return routine.id !== id;
  });
  return res.redirect('/previousRoutines');
};

exports.deleteRoutine = function (req, res) {
  const id = req.params.id;
  currentRoutines.routines = currentRoutines.routines.filter(function (routine) {
    return routine.id !== id;
  });
  return res.redirect('/currentRoutines');
};

exports.editRoutine = function (req, res) {
  const id = req.params.id;
  const allRoutines = currentRoutines.routines;
  allRoutines.some(function (routine) {
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
      routine.everyDay = (!routine.repeatSunday && !routine.repeatMonday && !routine.repeatTuesday && !routine.repeatWednesday
        && !routine.repeatThursday && !routine.repeatFriday) || (routine.repeatSunday && routine.repeatMonday
          && routine.repeatTuesday && routine.repeatWednesday && routine.repeatThursday && routine.repeatFriday && routine.repeatSaturday);
      routine.everyOtherDay = req.body.everyOtherDay;
      routine.goalReward = req.body.goalReward;

      let goals = req.body.goals;
      goals = goals.split(",");
      // Remove leading and trailing spaces
      for (let i = 0; i < goals.length; i++) {
        goals[i] = goals[i].trim();
      }
      // Exclude last goal if it's an empty string
      if (goals[goals.length - 1].trim() === "") goals.pop();
      // Capitalize first letter of each item in goals array
      for (let i = 0; i < goals.length; i++) {
        goals[i] = goals[i].charAt(0).toUpperCase() + goals[i].substr(1);
      }
      routine.goals = goals;
    }
  });
  return res.redirect('/currentRoutines');
};

exports.updateCompletionLog = function (req, res) {
  console.log('Update completion log', req.body);

  const index = req.body.index;
  const isComplete = req.body.isComplete === 'on' ? 1 : 0;
  const id = req.params.id;
  const allRoutines = currentRoutines.routines;

  const currentRoutineData = allRoutines.find(function (routine) {
    return routine.id === id;
  });

  currentRoutineData.daysCompleted = isComplete ? currentRoutineData.daysCompleted + 1 : currentRoutineData.daysCompleted - 1;

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

exports.viewCreateRoutine = function (req, res) {
  res.render('createRoutine', {
    navbarTitle: 'Create Routine',
    currentRoutines
  });
};

exports.viewCreateRoutineAlt = function (req, res) {
  res.render('createRoutineAlt', {
    navbarTitle: 'Create Routine',
    currentRoutines
  });
};

exports.viewCurrentRoutine = function (req, res) {
  const id = req.params.id;

  const currentRoutineData = currentRoutines.routines.find(function (routine) {
    return routine.id === id;
  });

  console.log('Current routine data:', currentRoutineData);

  res.render('currentRoutine', {
    navbarTitle: 'Current Routine',
    currentRoutineData
  });
};

exports.viewEditRoutine = function (req, res) {
  const id = req.params.id;
  const currentRoutineData = currentRoutines.routines.find(function (routine) {
    return routine.id === id;
  });

  if (currentRoutineData.goals) {
    for (let i = 1; i < currentRoutineData.goals.length; i++) {
      if (currentRoutineData.goals[i].charAt(0) != " ") {
        currentRoutineData.goals[i] = " " + currentRoutineData.goals[i];
      }
    }
  }

  res.render('editRoutine', {
    navbarTitle: 'Edit Routine',
    currentRoutineData
  });
};

exports.viewPreviousRoutine = function (req, res) {
  const id = req.params.id;

  const previousRoutineData = previousRoutines.routines.find(function (routine) {
    return routine.id === id;
  });

  console.log('Previous routine data:', previousRoutineData);

  res.render('previousRoutine', {
    navbarTitle: 'Archived Routine',
    previousRoutineData
  });
};

exports.viewAllCurrentRoutines = function (req, res) {
  res.render('currentRoutines', {
    navbarTitle: 'Current Routines',
    currentRoutines
  });
};

exports.viewAllPreviousRoutines = function (req, res) {
  res.render('previousRoutines', {
    navbarTitle: 'Archived Routines',
    previousRoutines
  });
};
