import type { NextApiRequest, NextApiResponse } from "next";
import redis from "@/lib/redis";

export default async function connector(
	req: NextApiRequest, 
	res: NextApiResponse
) {
	if (req.method === "GET") {
		console.log(req.body);
		return;
	}
	
  if (req.method === "POST") {
    const { key, value } = req.body;
    if (!key || !value) return res.status(400).json({ error: "Missing key or value" });

    try {
      await redis.set(key, value, { EX: 3600 }); // Set key with 1-hour expiration
      return res.status(200).json({ message: `Stored ${key}: ${value}` });
    } catch (error) {
      return res.status(500).json({ error: "Failed to write to Redis" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}


