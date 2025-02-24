import type { NextApiRequest, NextApiResponse } from "next";
// import { OpenAI } from 'openai';

// type Thread = {
// 	name: string,
// 	messages: string[]
// }

export default async function prompt(
	req: NextApiRequest,
	res: NextApiResponse,
) {

	const { prompt } = req.body;
	console.log(prompt);
	
	// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	// const completion = await openai.chat.completions.create({
	// 	model: 'gpt-3.5-turbo',
	// 	messages: [{ role: 'user', content: prompt }]
	// });

	// const response = completion.choices[0].message.content;

	const response = 'Agent is currently inactive.'

	res.status(200).json({ res: response })
}