export function getWeekNumber(date) {

  const firstDay =
    new Date(
      date.getFullYear(),
      0,
      1
    );


  const pastDays =
    Math.floor(
      (date - firstDay) /
      86400000
    );


  return Math.ceil(
    (pastDays + firstDay.getDay() + 1) / 7
  );

}