export function checkAuth(req){


  const cookie =
    req.headers.cookie || "";


  return cookie.includes(
    "analytics_auth=authenticated"
  );


}