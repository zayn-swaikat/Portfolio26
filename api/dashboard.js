import { redis } from "./lib/redis.js";

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const [
      stats,
      countries,
      browsers,
      devices,
      referrers
    ] = await Promise.all([

      redis.get("portfolio:stats"),

      redis.hgetall("analytics:countries"),

      redis.hgetall("analytics:browsers"),

      redis.hgetall("analytics:devices"),

      redis.hgetall("analytics:referrers")

    ]);



    const sortObject = (obj) => {

      return Object.entries(obj || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    };



    return res.status(200).json({

      stats: stats || {
        total: 0,
        today: 0,
        week: 0,
        month: 0
      },

      countries: sortObject(countries),

      browsers: sortObject(browsers),

      devices: sortObject(devices),

      referrers: sortObject(referrers),

      updatedAt: new Date().toISOString()

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Dashboard error"
    });

  }

}