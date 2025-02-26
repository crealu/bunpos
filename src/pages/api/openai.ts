import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from 'openai';

export default async function prompt(
	req: NextApiRequest,
	res: NextApiResponse,
) {

	let { tail } = req.body;
	console.log(tail);

	const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	const completion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: tail,
	});

	const agentResponse = completion.choices[0].message.content;
	console.log(agentResponse);

	const response = {
		role: 'assistant',
		content: agentResponse
	}

	res.status(200).json(response)
}