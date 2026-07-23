import { Redis } from "@upstash/redis";


const redis = new Redis({

  url: process.env.UPSTASH_REDIS_REST_URL,

  token: process.env.UPSTASH_REDIS_REST_TOKEN,

});


export async function incrementVisitCounters() {

  const now = new Date();


  const year = now.getFullYear();

  const month =
    String(now.getMonth() + 1)
    .padStart(2, "0");


  const day =
    String(now.getDate())
    .padStart(2, "0");


  const week =
    getWeekNumber(now);


  await Promise.all([

    redis.incr(
      "portfolio:visits:total"
    ),


    redis.incr(
      `portfolio:visits:${year}-${month}`
    ),


    redis.incr(
      `portfolio:visits:${year}-week-${week}`
    ),


    redis.incr(
      `portfolio:visits:${year}-${month}-${day}`
    ),

  ]);

}



function getWeekNumber(date) {

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