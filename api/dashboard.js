import { redis } from "./lib/redis.js";
import { getWeekNumber, getLastDays } from "./lib/date.js";
import { checkAuth } from "./lib/auth.js";

export default async function handler(req, res) {

if(!checkAuth(req)){

 return res.status(401).json({
   error:"Unauthorized"
 });

}

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const week = getWeekNumber(now);

    const [
    total,
    monthly,
    weekly,
    daily,
    countries,
    browsers,
    devices,
    referrers,
    history,
    uniqueVisitors
    ] = await Promise.all([

    redis.get("portfolio:visits:total"),

    redis.get(`portfolio:visits:${year}-${month}`),

    redis.get(`portfolio:visits:${year}-week-${week}`),

    redis.get(`portfolio:visits:${year}-${month}-${day}`),

    redis.hgetall("analytics:countries"),

    redis.hgetall("analytics:browsers"),

    redis.hgetall("analytics:devices"),

    redis.hgetall("analytics:referrers"),

    redis.hgetall(
      "analytics:history"
    ),

    redis.scard(
    "analytics:sessions"
    )

    ]);



    const sortObject = (obj) => {

      return Object.entries(obj || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    };

    const timeline =
      getLastDays(30)
      .map((date)=>({

        date,

        visits:
          Number(
            history?.[date] || 0
          )

      }));

    return res.status(200).json({

    stats: {

        total: Number(total || 0),

        today: Number(daily || 0),

        week: Number(weekly || 0),

        month: Number(monthly || 0),

        unique:
        Number(uniqueVisitors || 0),

    },

    countries: sortObject(countries),

    browsers: sortObject(browsers),

    devices: sortObject(devices),

    referrers: sortObject(referrers),

    history: timeline,

    updatedAt: new Date().toISOString(),

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Dashboard error"
    });

  }

}