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



export function getLastDays(days = 30){

  const result = [];

  const today = new Date();


  for(
    let i = days - 1;
    i >= 0;
    i--
  ){

    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );


    result.push(
      date.toISOString()
      .split("T")[0]
    );

  }


  return result;

}