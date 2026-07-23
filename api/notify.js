import { sendTelegramMessage } from "./lib/telegram.js";
import { formatVisitorMessage } from "./lib/formatter.js";
import { getGeoData } from "./lib/geo.js";


export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }


  try {

    const forwarded =
      req.headers["x-forwarded-for"];

    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.socket.remoteAddress;


    const geo = await getGeoData(ip);


    const visitor = {
      ...req.body,
      ...geo,
    };


    const message =
      formatVisitorMessage(visitor);


    await sendTelegramMessage(message);


    return res.status(200).json({
      success: true,
    });


  } catch(error) {

    console.error(error);

    return res.status(500).json({
      success:false,
      error:error.message,
    });

  }
}