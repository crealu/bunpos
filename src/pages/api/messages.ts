import type { NextApiRequest, NextApiResponse } from "next";

type Thread = {
	name: string,
	messages: string[]
}

export default function threader(
	req: NextApiRequest,
	res: NextApiResponse<Thread>,
) {
	res.status(200).json({ 
		name: 'Music Chat', 
		messages: [
			'Hi',
			'Hey',
			'How are you?',
			'Great how are you?',
			'Fine, can you help me with something?',
			"Sure, what is it?"
		]
	});
}