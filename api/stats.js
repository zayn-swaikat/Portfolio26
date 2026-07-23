import { Redis } from "@upstash/redis";


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});


export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }


  try {

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


    const [
      total,
      monthly,
      weekly,
      daily,
    ] = await Promise.all([

      redis.get(
        "portfolio:visits:total"
      ),

      redis.get(
        `portfolio:visits:${year}-${month}`
      ),

      redis.get(
        `portfolio:visits:${year}-week-${week}`
      ),

      redis.get(
        `portfolio:visits:${year}-${month}-${day}`
      ),

    ]);


    return res.status(200).json({

      total: total ?? 0,

      month: monthly ?? 0,

      week: weekly ?? 0,

      today: daily ?? 0,

      updatedAt:
        new Date().toISOString(),

    });


  } catch(error) {

    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });

  }

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