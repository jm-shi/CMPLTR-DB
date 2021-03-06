/*
 * GET profile page.
 */

const { Routine } = require('../models/routine.js');
const { User } = require('../models/user.js');

exports.view = function (req, res) {
  let signedInUser = 'anonymous';
  if (req.session && req.session._id) {
    signedInUser = req.session._id;
  }

  let currentRoutines = [];
  let previousRoutines = [];
  Routine.find({ isArchived: false, owner: signedInUser }, function (err, userCurrRoutines) {
    currentRoutines = userCurrRoutines;
  }).then(function () {
    Routine.find({ isArchived: true, owner: signedInUser }, function (err, userPrevRoutines) {
      previousRoutines = userPrevRoutines;
    }).then(function () {
      let currRoutinesDaysCompleted = 0;
      let currRoutinesDaysTotal = 0
      let currGoalsTotal = 0;
      const numCurrRoutines = currentRoutines.length;
      for (let i = 0; i < numCurrRoutines; i++) {
        const currRoutine = currentRoutines[i];
        currRoutinesDaysCompleted += currRoutine.daysCompleted;
        currRoutinesDaysTotal += parseInt(currRoutine.daysToComplete);
        currGoalsTotal += currRoutine.goals.length;
      }

      let prevRoutinesDaysCompleted = 0;
      let prevRoutinesDaysTotal = 0
      let prevGoalsCompleted = 0;
      let prevGoalsTotal = 0;
      const numPrevRoutines = previousRoutines.length;
      for (let i = 0; i < numPrevRoutines; i++) {
        const prevRoutine = previousRoutines[i];
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

      if (req.session && req.session.first_name) {
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
          totalGoalsCompletedPercentage,
          firstName: req.session.first_name,
          fullName: req.session.name,
          email: req.session.email,
          userSignedIn: true
        });
      } else {
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
      }
    })

  });
};

exports.editUserInfo = async function (req, res) {
  console.log("Called edit user info", req.body);
  if (req.session && req.session._id) {
    const id = req.session._id;
    update = {
      $set: {
        first_name: req.body.name.trim().split(" ")[0],
        name: req.body.name,
        email: req.body.email
      }
    }
    User.findByIdAndUpdate(id, update, { new: true }, function (err, updatedUser) {
      if (err) {
        return console.log('Error with updating user information', err);
      }
      console.log('Updated user', updatedUser);
      req.session.name = updatedUser.name;
      req.session.first_name = updatedUser.name.trim().split(" ")[0];
      req.session.email = updatedUser.email;
      res.redirect('/profile');
    })
  } else {
    console.log("User not logged in");
  }
}