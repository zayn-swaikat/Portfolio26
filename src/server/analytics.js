import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function saveAnalytics(data) {

  const tasks = [];

  const dateKey =
    new Date()
    .toISOString()
    .split("T")[0];


  tasks.push(

    redis.hincrby(
      "analytics:history",
      dateKey,
      1
    )

  );

  if (data.session) {

    tasks.push(

      redis.sadd(
        "analytics:sessions",
        data.session
      )

    );

  }

  if (data.event) {

    tasks.push(

      redis.hincrby(
        "analytics:events",
        data.event,
        1
      )

    );

  }

  if (data.country) {

    tasks.push(

      redis.hincrby(
        "analytics:countries",
        data.country,
        1
      )

    );

  }

  if (
    data.browser &&
    !data.browser.toLowerCase().includes("headless")
  ) {

    tasks.push(
      redis.hincrby(
        "analytics:browsers",
        data.browser,
        1
      )
    );

  }

  if (data.device) {

    tasks.push(

      redis.hincrby(
        "analytics:devices",
        data.device,
        1
      )

    );

  }

  if (data.page) {

    tasks.push(

      redis.hincrby(
        "analytics:pages",
        data.page,
        1
      )

    );

  }

  if (data.referrer) {

    tasks.push(

      redis.hincrby(
        "analytics:referrers",
        data.referrer,
        1
      )

    );

  }

  await Promise.all(tasks);

}