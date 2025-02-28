// lib/redis.ts
import { createClient } from "redis";

// const redis = createClient({
//   url: process.env.REDIS_URL1, // Redis Cloud connection URL
// });

const client = createClient({
  username: 'writerOne',
  password: process.env.REDIS_PWD,
  socket: {
      host: 'memcached-16619.c277.us-east-1-3.ec2.redns.redis-cloud.com',
      port: 16619
  }
});

redis.on("error", (err) => console.error("Redis error:", err));

(async () => {
  if (!redis.isOpen) await redis.connect();
})();

export default redis;
