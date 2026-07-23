import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function saveAnalytics(data) {

  const tasks = [];

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

  if (data.browser) {

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