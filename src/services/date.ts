import { pad2Number } from './utils';

const MONTH_FULLNAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ABBREVIATION_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getAbbreviationDay(day: number) {
  return ABBREVIATION_DAYS[day];
}

function getCurrentDayFormated(date: Date) {
  //return @string date formatted: DD/MM/YYYY
  const dateFormated = date.toLocaleDateString('en-GB');

  return dateFormated;
}

function getTotalMinutesSpan(beginTime: string, endTime: string) {
  const [hoursBeginTime, minutesBeginTime] = beginTime.split(':');
  const [hoursEndTime, minutesEndTime] = endTime.split(':');

  const totalMinutesBeginTime = Number(hoursBeginTime) * 60 + Number(minutesBeginTime);
  const totalMinutesEndTime = Number(hoursEndTime) * 60 + Number(minutesEndTime);

  const timeSpanMinutes = totalMinutesEndTime - totalMinutesBeginTime;

  return timeSpanMinutes;
}

function formatMinutesAndHour(totalMinutes: number, showTimeMeasurements: boolean = false) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  let timeMeasurements = 'minutes';

  if (hours) {
    timeMeasurements = 'hours';
  }

  return showTimeMeasurements
    ? `${pad2Number(hours)}:${pad2Number(minutes)} ${timeMeasurements}`
    : `${pad2Number(hours)}:${pad2Number(minutes)}`;
}

function getTimeSpan(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  let timeMeasurements = 'minutes';

  if (hours) {
    timeMeasurements = 'hours';
    return `${pad2Number(hours)}:${pad2Number(minutes)} ${timeMeasurements}`;
  } else {
    return `${minutes} ${timeMeasurements}`;
  }
}

function formatWithHourPeriods(date: string) {
  let period = 'AM';
  let hour = Number(date.split(':')[0]);

  if (hour > 12) period = 'PM';

  return `${date} ${period}`;
}

function getMonthAndYear(date: Date) {
  return `${MONTH_FULLNAMES[date.getMonth()]}, ${date.getFullYear()}`;
}

export {
  getCurrentDayFormated,
  getTotalMinutesSpan,
  pad2Number,
  formatMinutesAndHour,
  formatWithHourPeriods,
  getMonthAndYear,
  getTimeSpan,
  getAbbreviationDay,
};
