const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/cmpltr-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const CurrentRoutine = mongoose.model('CurrentRoutine', {
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
    type: String
  },
  goalReward: {
    type: String
  }
});

const PreviousRoutine = mongoose.model('PreviousRoutine', {
  title: {
    type: String,
    required: true
  },
  daysToComplete: {
    type: Number,
    required: true
  }
})

module.exports = {
  CurrentRoutine,
  PreviousRoutine
}