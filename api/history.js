import { Redis } from "@upstash/redis";


const redis = new Redis({

  url: process.env.UPSTASH_REDIS_REST_URL,

  token: process.env.UPSTASH_REDIS_REST_TOKEN,

});



export default async function handler(req,res){


  if(req.method !== "GET"){

    return res.status(405).json({
      error:"Method Not Allowed"
    });

  }



  try {


    const data =
      await redis.hgetall(
        "portfolio:daily"
      );



    const history =
      Object.entries(data || {})

      .map(([date,visits])=>({

        date,

        visits:Number(visits)

      }))

      .sort(
        (a,b)=>
        new Date(a.date)
        -
        new Date(b.date)
      );



    res.status(200).json(history);



  } catch(error){

    console.error(error);

    res.status(500).json({
      error:"Server error"
    });

  }

}