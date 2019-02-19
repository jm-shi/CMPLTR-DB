/*
 * GET profile page.
 */

let currentRoutines = require('../currentRoutines.json');
let previousRoutines = require('../previousRoutines.json');

exports.view = function (req, res) {
  let currRoutinesDaysCompleted = 0;
  let currRoutinesDaysTotal = 0
  let currGoalsTotal = 0;
  const currRoutines = currentRoutines.routines;
  const numCurrRoutines = currRoutines.length;
  for (let i = 0; i < numCurrRoutines; i++) {
    const currRoutine = currRoutines[i];
    currRoutinesDaysCompleted += currRoutine.daysCompleted;
    currRoutinesDaysTotal += parseInt(currRoutine.daysToComplete);
    currGoalsTotal += currRoutine.goals.length;
  }

  let prevRoutinesDaysCompleted = 0;
  let prevRoutinesDaysTotal = 0
  let prevGoalsCompleted = 0;
  let prevGoalsTotal = 0;
  const prevRoutines = previousRoutines.routines;
  const numPrevRoutines = prevRoutines.length;
  for (let i = 0; i < numPrevRoutines; i++) {
    const prevRoutine = prevRoutines[i];
    prevRoutinesDaysCompleted += prevRoutine.daysCompleted;
    prevRoutinesDaysTotal += parseInt(prevRoutine.daysToComplete);
    prevGoalsCompleted += prevRoutine.completedGoalsCount;
    prevGoalsTotal += prevRoutine.goals.length;
  }
  const prevGoalsFailed = prevGoalsTotal - prevGoalsCompleted;

  const totalDaysCompleted = currRoutinesDaysCompleted + prevRoutinesDaysCompleted;
  const totalDays = currRoutinesDaysTotal + prevRoutinesDaysTotal;
  const totalDaysCompletedPercentage = totalDays === 0 ? 0 : Math.round((totalDaysCompleted / totalDays) * 100);

  const totalGoals = currGoalsTotal + prevGoalsTotal;
  const totalGoalsCompletedPercentage = totalGoals === 0 ? 0 : Math.round((prevGoalsCompleted / totalGoals) * 100);

  res.render('profile', {
    navbarTitle: 'Profile',
    currentRoutines,
    previousRoutines,
    numCurrRoutines,
    numPrevRoutines,
    totalDaysCompleted,
    totalDays,
    totalDaysCompletedPercentage,
    currGoalsTotal,
    prevGoalsCompleted,
    prevGoalsFailed,
    totalGoals,
    totalGoalsCompletedPercentage
  });
};