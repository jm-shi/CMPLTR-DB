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

function getWorkDays(startMonth, startDate, startYear, daysToComplete) {
  let workDays = [];
  let currMonth = startMonth;
  let currDate = startDate;
  let currYear = startYear;
  for (let i = 0; i < daysToComplete; i++) {
    let workDay = `${month[currMonth]} ${currDate}`;
    workDays.push(workDay);

    // Update date for next iteration
    if (currDate >= 28 && currMonth == 1 && isLeapYear(currYear)) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate = 1;
    } else if (currDate >= 29 && currMonth == 1) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate = 1;
    } else if (currDate >= 30 && !hasThirtyOneDays(currMonth)) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate = 1;
    } else if (currDate >= 31) {
      const tempMonth = nextMonth(currMonth, currYear)[0];
      const tempYear = nextMonth(currMonth, currYear)[1];
      currMonth = tempMonth;
      currYear = tempYear;
      currDate = 1;
    } else {
      currDate++;
    }
  }
  return workDays;
}

// let test = getWorkDays(1, 14, 2019, 16);
// console.log(test);
