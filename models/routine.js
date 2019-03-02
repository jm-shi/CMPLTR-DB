const mongoose = require('mongoose');

const Routine = mongoose.model('Routine', {
  title: {
    type: String,
    required: true
  },
  daysToComplete: {
    type: Number,
    validate(value) {
      if (value <= 0 || value > 365) {
        throw new Error('"Days to complete" must be between 0 and 366')
      }
    },
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  daysCompleted: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: String
  },
  alarm: {
    type: String
  },
  repeatSunday: {
    type: String,
  },
  repeatMonday: {
    type: String,
  },
  repeatTuesday: {
    type: String,
  },
  repeatWednesday: {
    type: String,
  },
  repeatThursday: {
    type: String,
  },
  repeatFriday: {
    type: String,
  },
  repeatSaturday: {
    type: String,
  },
  everyDay: {
    type: Boolean,
    default: false
  },
  everyOtherDay: {
    type: String
  },
  completionChart: {
    type: [Number]
  },
  goals: {
    type: [String],
    default: []
  },
  goalReward: {
    type: String
  },
  completedGoalsCount: {
    type: Number,
    default: 0
  },
  goalsArray: {
    type: [{
      goal: String,
      completed: Number
    }]
  },
  finishDate: {
    type: String
  }
});

module.exports = {
  Routine
}