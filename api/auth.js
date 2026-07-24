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
    [
      "analytics_auth=authenticated",
      "HttpOnly",
      "Secure",
      "SameSite=Strict",
      "Path=/",
      "Max-Age=604800"
    ].join("; ")
  );



  return res.status(200).json({
    success:true
  });

}