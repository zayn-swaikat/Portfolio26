import { getSessionId } from "./session.js";
import { getDeviceInfo } from "./device.js";


export async function track(event, payload = {}) {

  try {

    const device = await getDeviceInfo();


    await fetch("/api/notify", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        event,

        session: getSessionId(),

        timestamp: new Date().toISOString(),

        page: window.location.pathname,

        language: navigator.language,

        timezone:
          Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,


        screen: {
          width: window.screen.width,
          height: window.screen.height,
          pixelRatio: window.devicePixelRatio,
        },


        referrer:
          document.referrer || "Direct",


        ...device,

        ...payload,

      }),
    });


  } catch(error) {

    console.error(
      "Analytics error:",
      error
    );

  }
}