import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
	role: string,
	content: string
}

type Thread = {
	name: string,
	messages: Message[]
}

const thread = {
	name: 'Chat',
	messages: [
		{
			role: 'system',
			content: 'You are a helpful assistant'
		}
	]
}

export default function threader(
	req: NextApiRequest,
	res: NextApiResponse<Thread>,
) {
	res.status(200).json(thread);
}