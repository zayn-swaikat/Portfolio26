export async function getGeoData(ip) {
  if (!ip) {
    return {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      isp: "Unknown",
    };
  }

  try {
    const response = await fetch(
      `https://ipwho.is/${ip}`
    );

    const data = await response.json();

    if (!data.success) {
      return {
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
        isp: "Unknown",
      };
    }

    return {
      country: data.country,
      city: data.city,
      region: data.region,
      isp: data.connection?.isp ?? "Unknown",
    };

  } catch (error) {
    return {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      isp: "Unknown",
    };
  }
}