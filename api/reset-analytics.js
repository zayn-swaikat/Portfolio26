import { redis } from "./lib/redis.js";


export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    await redis.del(

      "portfolio:visits:total",

      "portfolio:visits:today",

      "portfolio:visits:week",

      "portfolio:visits:month",

      "analytics:countries",

      "analytics:browsers",

      "analytics:devices",

      "analytics:referrers",

      "analytics:history",

      "analytics:sessions"

    );


    return res.status(200).json({
      success: true,
      message: "Analytics cleared"
    });


  } catch(error) {

    console.error(error);

    return res.status(500).json({
      error: "Reset failed"
    });

  }

}