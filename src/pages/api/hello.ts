import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
	count: number;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	res.status(200).json({ name: 'Bob', count: 4 });
}