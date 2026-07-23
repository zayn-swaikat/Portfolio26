import { redis } from "./lib/redis.js";


export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const keys = await redis.keys(
      "portfolio:visits:*"
    );


    if (keys.length) {
      await redis.del(...keys);
    }


    await redis.del(

      "analytics:countries",

      "analytics:browsers",

      "analytics:devices",

      "analytics:referrers",

      "analytics:history",

      "analytics:sessions"

    );


    return res.status(200).json({

      success: true,

      deleted: keys.length,

      message: "Analytics cleared"

    });


  } catch(error) {

    console.error(error);

    return res.status(500).json({
      error:"Reset failed"
    });

  }

}