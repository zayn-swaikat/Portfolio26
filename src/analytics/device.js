import { UAParser } from "ua-parser-js";


export async function getDeviceInfo() {

  const parser = new UAParser();

  const result = parser.getResult();


  return {

    browser:
      result.browser.name || "Unknown",

    browserVersion:
      result.browser.version || "",

    os:
      result.os.name || "Unknown",

    osVersion:
      result.os.version || "",

    device:
      result.device.type || "Desktop",

  };
}