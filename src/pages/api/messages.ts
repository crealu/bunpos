import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
	role: string,
	content: string
}

type Thread = {
	name: string,
	messages: Message[]
}

// type Thread = {
// 	name: string,
// 	messages: string[]
// }

const thread1 = {
	name: 'Music Chat',
	messages: [
		'Hi',
		'Hey',
		'How are you?',
		'Great how are you?',
		'Fine, can you help me with something?',
		"Sure, what is it?"
	]
}

const thread2 = {
	name: 'Custom Chat',
	messages: []
}

const thread3 = {
	name: 'Music Chat',
	messages: [
		{
			role: 'system',
			content: 'You are a helpful assistant'
		},
		{
			role: 'user',
			content: 'Hi'
		},
		{
			role: 'assistant',
			content: 'Hey'
		},
		{
			role: 'user',
			content: 'How are you?'
		},
		{
			role: 'assistant',
			content: 'Great, how are you?'
		}
	]
}

export default function threader(
	req: NextApiRequest,
	res: NextApiResponse<Thread>,
) {
	res.status(200).json(thread3);
}