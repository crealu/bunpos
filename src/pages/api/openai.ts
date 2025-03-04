import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from 'openai';

export default async function prompt(
	req: NextApiRequest,
	res: NextApiResponse,
) {

	const { tail } = req.body;
	const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
	const completion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: tail,
		// store: true,
		// stream: true,
	});

	const agentResponse = completion.choices[0].message.content;
	// for streaming
	// const agentResponse = completion.choices[0].delta.content;

	console.log(agentResponse);

	const response = {
		role: 'assistant',
		content: agentResponse
	}

	res.status(200).json(response)
}