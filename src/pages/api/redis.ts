import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/redis";

export default async function connector(
	req: NextApiRequest, 
	res: NextApiResponse
) {
	if (req.method === "GET") {
    try {
      const keys = await client.keys('*');

      if (keys.length === 0) return res.status(200).json({ data: {} });
      const values = await client.mGet(keys);
      const data = Object.fromEntries(keys.map((key, i) => [key, values[i]]));

      return res.status(200).json({ saved: data });
    } catch (error) {
      return res.status(500).json({ error: "Failed to read from Redis", msg: error });
    }
	}
	
  if (req.method === "POST") {
    const { key, value } = req.body;
    if (!key || !value) return res.status(400).json({ error: "Missing key or value" });

    try {
      await client.set(key, value, { EX: 3600 }); // Set key with 1-hour expiration
      return res.status(200).json({ message: `Stored ${key}: ${value}` });
    } catch (error) {
      return res.status(500).json({ error: "Failed to write to Redis", msg: error });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}


