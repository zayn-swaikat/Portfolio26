import { serialize } from "cookie";


export default async function handler(req,res){


  if(req.method !== "POST"){

    return res.status(405).json({
      error:"Method not allowed"
    });

  }



  const {
    password
  } = req.body;



  if(
    password !==
    process.env.ANALYTICS_PASSWORD
  ){

    return res.status(401).json({
      error:"Wrong password"
    });

  }



  res.setHeader(
    "Set-Cookie",
    serialize(
      "analytics_auth",
      "authenticated",
      {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:60*60*24*7,
        path:"/"
      }
    )
  );



  return res.status(200).json({
    success:true
  });

}