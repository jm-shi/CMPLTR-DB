const day = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function isLeapYear(year) {
  return year % 4;
}

// 0 is January, 1 is February, ..., 12 is December
function hasThirtyOneDays(currMonth) {
  return (currMonth <= 6 && currMonth % 2 == 0) || currMonth % 2 == 1;
}

function nextMonth(currMonth, currYear) {
  if (currMonth == 11) {
    currMonth = 0;
    currYear++;
  } else {
    currMonth++;
  }
  return [currMonth, currYear];
}

function getWorkDays(startDay, repeatSunday, repeatMonday, repeatTuesday, repeatWednesday, repeatThursday, repeatFriday,
  repeatSaturday, repeatEveryOtherDay, startMonth, startDate, startYear, daysToComplete) {
  let workDays = [];
  let currDay = startDay;
  let currMonth = startMonth;
  let currDate = startDate;
  let currYear = startYear;

  // false in repeatDays means to not do routine on that day
  // true in repeatDays means to do routine on that day
  const repeatDays = [repeatSunday, repeatMonday, repeatTuesday, repeatWednesday, repeatThursday, repeatFriday, repeatSaturday];
  const hasRepeat = function (day) {
    return day;
  }
  // Start routine on the first day of the week the user toggled "repeat __day" to true
  const hasRepeatDay = repeatDays.some(hasRepeat);
  if (hasRepeatDay) {
    while (!repeatDays[startDay]) {
      startDay = (startDay + 1 >= repeatDays.length) ? 0 : startDay + 1;
      currDate++;
    }
  }

  if (hasRepeatDay) {
    currDay = startDay;
  }

  for (let i = 0; i < daysToComplete; i++) {
    let workDay = `${month[currMonth]} ${currDate}`;
    let daysToIncrement = 1;

    if (hasRepeatDay && !repeatEveryOtherDay) {
      if (repeatDays[currDay]) {
        workDays.push(workDay);
      } else {
        i--;
      }
      currDay = (currDay + 1 >= repeatDays.length) ? 0 : currDay + 1;
      currDate++;
    } else {
      workDays.push(workDay);
      if (repeatEveryOtherDay) {
        daysToIncrement = 2;
      }
      currDate += daysToIncrement;
    }

    if (currDate >= 29 && currMonth == 1 && isLeapYear(currYear)) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate -= 28;
    } else if (currDate >= 30 && currMonth == 1) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate -= 29;
    } else if (currDate >= 31 && !hasThirtyOneDays(currMonth)) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate -= 30;
    } else if (currDate >= 32) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate -= 31;
    }
  }
  return workDays;
}

// Convert military time to standard time
// @param time - military time in the form of hh:mm (e.g. 07:30)
function militaryToStandard(time) {
  // Return original time in case user sets an invalid alarm time
  if (time.length !== 5 || isNaN(time.slice(0, 2) + time.slice(3))) return time;

  let standardTime = "";
  const timeArr = time.split(":");
  let hours = Number(timeArr[0]);
  let mins = Number(timeArr[1]);
  let isAM = true;
  if (hours > 12) {
    hours = hours - 12;
    isAM = false;
  }
  mins = mins < 10 ? "0" + mins : mins;
  standardTime = hours + ":" + mins;
  standardTime = isAM ? standardTime + " AM" : standardTime + " PM";

  return standardTime;
}