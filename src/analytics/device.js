import UAParser from "ua-parser-js";

export async function getDeviceInfo() {
  const parser = new UAParser();

  const result = parser.getResult();

  let highEntropy = {};

  if (navigator.userAgentData?.getHighEntropyValues) {
    try {
      highEntropy = await navigator.userAgentData.getHighEntropyValues([
        "platform",
        "platformVersion",
        "architecture",
        "bitness",
        "model",
        "fullVersionList",
      ]);
    } catch {}
  }

  return {
    browser:
      result.browser.name && result.browser.version
        ? `${result.browser.name} ${result.browser.version}`
        : "Unknown",

    os:
      result.os.name && result.os.version
        ? `${result.os.name} ${result.os.version}`
        : "Unknown",

    device: result.device.type ?? "Desktop",

    cpu: result.cpu.architecture ?? highEntropy.architecture ?? "Unknown",

    platform: highEntropy.platform ?? result.os.name,

    model: highEntropy.model || result.device.model || null,
  };
}