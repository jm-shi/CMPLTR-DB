const { Routine } = require('../models/routine.js');

exports.addRoutine = function(req, res) {
  const createdAtString = req.body.createdAtString;
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
  const everyDay =
    (repeatSunday !== 'on' &&
      repeatMonday !== 'on' &&
      repeatTuesday !== 'on' &&
      repeatWednesday !== 'on' &&
      repeatThursday !== 'on' &&
      repeatFriday !== 'on') ||
    (repeatSunday === 'on' &&
      repeatMonday === 'on' &&
      repeatTuesday === 'on' &&
      repeatWednesday === 'on' &&
      repeatThursday === 'on' &&
      repeatFriday === 'on' &&
      repeatSaturday === 'on');
  const everyOtherDay = req.body.everyOtherDay;
  let owner = 'anonymous';
  if (req.session && req.session._id) {
    owner = req.session._id;
  }

  let goals = req.body.goals;
  goals = goals.split(',');
  // Remove leading and trailing spaces
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].trim();
  }
  // Exclude last goal if it's an empty string
  if (goals[goals.length - 1].trim() === '') goals.pop();
  // Capitalize first letter of each item in goals array
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].charAt(0).toUpperCase() + goals[i].substr(1);
  }
  goals = goals.length === 0 ? undefined : goals;

  const goalReward = req.body.goalReward;

  let currentRoutine = {
    createdAtString,
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
    goalReward,
    owner
  };

  if (title && daysToComplete) {
    const newRoutine = new Routine(currentRoutine);
    newRoutine
      .save()
      .then(function() {
        console.log('Created new routine!');
        res.send(newRoutine);
        return res.redirect('/currentRoutines');
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }
};

exports.completeRoutine = function(req, res) {
  const id = req.params.id;
  const completedGoalsCount = parseInt(req.body.completedGoalsCount);
  let goalsArray = req.body.goalsArray;
  if (goalsArray) {
    goalsArray = goalsArray.map(function(item) {
      return {
        goal: item.goal,
        completed: parseInt(item.completed)
      };
    });
  }
  const date = new Date();
  const finishDate = {
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear()
  };
  const finishDateString = JSON.stringify(finishDate);

  update = {
    $set: {
      isArchived: true,
      finishDate: finishDateString,
      completedGoalsCount,
      goalsArray
    }
  };

  Routine.findByIdAndUpdate(id, update, { new: true }, function(
    err,
    updatedRoutine
  ) {
    if (err) {
      return console.log('Error with archiving routine', err);
    }
    return res.redirect('/currentRoutines');
  });
};

exports.deletePreviousRoutine = function(req, res) {
  const id = req.params.id;
  Routine.findByIdAndRemove(id, function(err, routine) {
    if (err) {
      return console.log('Could not remove current routine', err);
    }
    console.log('Successfully deleted routine!');
    return res.redirect('/previousRoutines');
  });
};

exports.deleteRoutine = function(req, res) {
  const id = req.params.id;
  Routine.findByIdAndRemove(id, function(err, routine) {
    if (err) {
      return console.log('Could not remove current routine', err);
    }
    console.log('Successfully deleted routine!');
    return res.redirect('/currentRoutines');
  });
};

exports.editRoutine = async function(req, res) {
  const id = req.params.id;

  let goals = req.body.goals;
  goals = goals.split(',');
  // Remove leading and trailing spaces
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].trim();
  }
  // Exclude last goal if it's an empty string
  if (goals[goals.length - 1].trim() === '') goals.pop();
  // Capitalize first letter of each item in goals array
  for (let i = 0; i < goals.length; i++) {
    goals[i] = goals[i].charAt(0).toUpperCase() + goals[i].substr(1);
  }

  let updatedCompletionChart = [];
  let updatedDaysToComplete = req.body.daysToComplete;
  let updatedDaysCompleted = 0;

  await Routine.findById(id, function(err, currRoutine) {
    const originalDaysToComplete = currRoutine.daysToComplete;
    const newDaysToComplete = parseInt(req.body.daysToComplete);
    if (originalDaysToComplete <= newDaysToComplete) {
      const daysToAdd = newDaysToComplete - originalDaysToComplete;
      currRoutine.completionChart = currRoutine.completionChart.concat(
        Array(daysToAdd).fill(0)
      );
    } else {
      let completedDaysToRemove = 0;
      for (
        let i = newDaysToComplete;
        i < currRoutine.completionChart.length;
        i++
      ) {
        if (currRoutine.completionChart[i] === 1) {
          completedDaysToRemove++;
        }
      }
      updatedDaysCompleted = currRoutine.daysCompleted - completedDaysToRemove;
      currRoutine.completionChart = currRoutine.completionChart.slice(
        0,
        newDaysToComplete
      );
    }
    updatedCompletionChart = currRoutine.completionChart;
    updatedDaysToComplete = newDaysToComplete;
  });

  const update = {
    title: req.body.title,
    completionChart: updatedCompletionChart,
    daysCompleted: updatedDaysCompleted,
    daysToComplete: updatedDaysToComplete,
    alarm: req.body.alarm,
    repeatMonday: req.body.repeatMonday,
    repeatTuesday: req.body.repeatTuesday,
    repeatWednesday: req.body.repeatWednesday,
    repeatThursday: req.body.repeatThursday,
    repeatFriday: req.body.repeatFriday,
    repeatSaturday: req.body.repeatSaturday,
    repeatSunday: req.body.repeatSunday,
    everyDay:
      (req.body.repeatSunday !== 'on' &&
        req.body.repeatMonday !== 'on' &&
        req.body.repeatTuesday !== 'on' &&
        req.body.repeatWednesday !== 'on' &&
        req.body.repeatThursday !== 'on' &&
        req.body.repeatFriday !== 'on') ||
      (req.body.repeatSunday === 'on' &&
        req.body.repeatMonday === 'on' &&
        req.body.repeatTuesday === 'on' &&
        req.body.repeatWednesday === 'on' &&
        req.body.repeatThursday === 'on' &&
        req.body.repeatFriday === 'on' &&
        req.body.repeatSaturday === 'on'),
    everyOtherDay: req.body.everyOtherDay,
    goalReward: req.body.goalReward,
    goals: goals
  };

  Routine.findByIdAndUpdate(id, update, { new: true }, function(
    err,
    updatedRoutine
  ) {
    if (err) {
      return console.log('Error with updating routine', err);
    }
    console.log('The updated routine is...', updatedRoutine);
    return res.redirect('/currentRoutines');
  });
};

exports.updateCompletionLog = function(req, res) {
  console.log('Update completion log', req.body);

  const index = req.body.index;
  const isComplete = req.body.isComplete === 'on' ? 1 : 0;
  const id = req.params.id;

  let update = {};
  update['completionChart.' + index] = isComplete;

  const indexToUpdate = 'completionChart.' + index;
  const incrementBy = isComplete ? 1 : -1;

  update = {
    $set: { [indexToUpdate]: isComplete },
    $inc: { daysCompleted: incrementBy }
  };

  Routine.findByIdAndUpdate(id, update, { new: true }, function(
    err,
    updatedRoutine
  ) {
    if (err) {
      return console.log('Error with updating completion log', err);
    }
    if (req.session && req.session.first_name) {
      res.render('currentRoutine', {
        navbarTitle: 'Current Routine',
        currentRoutineData: updatedRoutine,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('currentRoutine', {
        navbarTitle: 'Current Routine',
        currentRoutineData: updatedRoutine
      });
    }
  });
};

exports.viewCreateRoutine = function(req, res) {
  if (req.session && req.session.first_name) {
    res.render('createRoutine', {
      navbarTitle: 'Create Routine',
      firstName: req.session.first_name,
      userSignedIn: true
    });
  } else {
    res.render('createRoutine', {
      navbarTitle: 'Create Routine'
    });
  }
};

exports.viewCreateRoutineAlt = function(req, res) {
  if (req.session && req.session.first_name) {
    res.render('createRoutineAlt', {
      navbarTitle: 'Create Routine',
      firstName: req.session.first_name,
      userSignedIn: true
    });
  } else {
    res.render('createRoutineAlt', {
      navbarTitle: 'Create Routine'
    });
  }
};

exports.viewCurrentRoutine = function(req, res) {
  const id = req.params.id;

  Routine.findById(id, function(err, routine) {
    if (err) {
      return console.log('Error with finding current routine:', err);
    }

    console.log('Current routine data:', routine);
    if (req.session && req.session.first_name) {
      res.render('currentRoutine', {
        navbarTitle: 'Current Routine',
        currentRoutineData: routine,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('currentRoutine', {
        navbarTitle: 'Current Routine',
        currentRoutineData: routine
      });
    }
  });
};

exports.viewEditRoutine = function(req, res) {
  const id = req.params.id;

  Routine.findById(id, function(err, currentRoutine) {
    if (err) {
      return console.log('Could not view edit routine screen', err);
    }
    console.log('Found routine to edit:', currentRoutine);
    if (currentRoutine.goals) {
      // Append a space to the start of each subsequent goal
      for (let i = 1; i < currentRoutine.goals.length; i++) {
        if (currentRoutine.goals[i].charAt(0) != ' ') {
          currentRoutine.goals[i] = ' ' + currentRoutine.goals[i];
        }
      }
    }

    if (req.session && req.session.first_name) {
      res.render('editRoutine', {
        navbarTitle: 'Edit Routine',
        currentRoutineData: currentRoutine,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('editRoutine', {
        navbarTitle: 'Edit Routine',
        currentRoutineData: currentRoutine
      });
    }
  });
};

exports.viewPreviousRoutine = function(req, res) {
  const id = req.params.id;

  Routine.findById(id, function(err, routine) {
    if (err) {
      return console.log('Error with finding current routine:', err);
    }

    console.log('Previous routine data:', routine);
    if (req.session && req.session.first_name) {
      res.render('previousRoutine', {
        navbarTitle: 'Archived Routine',
        previousRoutineData: routine,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('previousRoutine', {
        navbarTitle: 'Archived Routine',
        previousRoutineData: routine
      });
    }
  });
};

exports.viewAllCurrentRoutines = function(req, res) {
  let signedInUser = 'anonymous';
  if (req.session && req.session._id) {
    signedInUser = req.session._id;
  }

  Routine.find({ isArchived: false, owner: signedInUser }, function(
    err,
    currRoutines
  ) {
    console.log('currroutines', currRoutines);
    if (req.session && req.session.first_name) {
      res.render('currentRoutines', {
        navbarTitle: 'Current Routines',
        currentRoutines: currRoutines,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('currentRoutines', {
        navbarTitle: 'Current Routines',
        currentRoutines: currRoutines
      });
    }
  }).sort('-createdAt');
};

exports.viewAllPreviousRoutines = function(req, res) {
  let signedInUser = 'anonymous';
  if (req.session && req.session._id) {
    signedInUser = req.session._id;
  }
  Routine.find({ isArchived: true, owner: signedInUser }, function(
    err,
    prevRoutines
  ) {
    if (req.session && req.session.first_name) {
      res.render('previousRoutines', {
        navbarTitle: 'Archived Routines',
        previousRoutines: prevRoutines,
        firstName: req.session.first_name,
        userSignedIn: true
      });
    } else {
      res.render('previousRoutines', {
        navbarTitle: 'Archived Routines',
        previousRoutines: prevRoutines
      });
    }
  }).sort('-updatedAt');
};
