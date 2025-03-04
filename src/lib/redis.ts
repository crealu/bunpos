// lib/redis.ts
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL, // Redis Cloud connection URL
});

client.on("error", (err: any) => console.error("Redis error:", err));

(async () => {
  if (!client.isOpen) await client.connect();
})();

export default client;
