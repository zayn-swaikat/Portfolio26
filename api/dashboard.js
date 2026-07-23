import { redis } from "./lib/redis.js";

export default async function handler(req, res) {

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
    referrers
    ] = await Promise.all([

    redis.get("portfolio:visits:total"),

    redis.get(`portfolio:visits:${year}-${month}`),

    redis.get(`portfolio:visits:${year}-week-${week}`),

    redis.get(`portfolio:visits:${year}-${month}-${day}`),

    redis.hgetall("analytics:countries"),

    redis.hgetall("analytics:browsers"),

    redis.hgetall("analytics:devices"),

    redis.hgetall("analytics:referrers"),

    ]);



    const sortObject = (obj) => {

      return Object.entries(obj || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    };



    return res.status(200).json({

    stats: {

        total: Number(total || 0),

        today: Number(daily || 0),

        week: Number(weekly || 0),

        month: Number(monthly || 0),

    },

    countries: sortObject(countries),

    browsers: sortObject(browsers),

    devices: sortObject(devices),

    referrers: sortObject(referrers),

    updatedAt: new Date().toISOString(),

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Dashboard error"
    });

  }

}