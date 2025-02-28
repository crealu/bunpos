"use client";
import styles from "@/styles/chat.module.css"
import homeStyles from "@/styles/home.module.css"
import { useState, useEffect, FormEvent } from 'react';

interface BubbleProps {
	text: string;
	index: number;
}

const Bubble:React.FC<BubbleProps> = ({ text, index }) => {
	const setBubbleStyle = () => {
		return `${index % 2 == 0 ? styles.user_bubble : styles.agent_bubble}`
	}

	return (
		<div className={`${styles.bubble_row} ${setBubbleStyle()}`}>
			<p>{text}</p>
		</div>
	)
}

type Message = {
	role: string,
	content: string
}

interface ThreadProps {
	messages: Message[];
}

// const Thread:React.FC<ThreadProps> = ({ messages }) => {
// 	return (
// 		<div className={styles.thread}>
// 			{messages?.map((msg, idx) => {
// 				return <Bubble text={msg.content} index={idx} key={idx} />
// 			})}
// 		</div>
// 	)
// }


export default function Chat() {
	const [name, setName] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([{ role: '', content: '' }]);
	const [prompt, setPrompt] = useState<string>('');

	async function getMessages() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/messages`);
		const data = await res.json();
		setName(data.name);

		data.messages.splice(0, 1);

		setMessages(data.messages);
	}

	async function pingRedis() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/redis`);
		const data = await res.json();

		console.log(data);
	}

	function updatePrompt(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPrompt(event.currentTarget.value);
		// setPrompt(event.target.value);
	}

	async function askAgent(tail) {
		console.log(tail);

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ tail: tail })
		}

		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/openai`, options);
		const data = await res.json();
		return data;
	}

	async function handleSend() {

		const newMessage = {
			role: 'user',
			content: prompt,
		}

		const newThread = [...(messages ?? []), newMessage];
		setMessages(newThread);

		const theTail = newThread.length >= 4 ? newThread.slice(newThread.length - 4) : newThread;
		const response = await askAgent(theTail);
		const updatedMessages = [...newThread, response];

		setPrompt('');
		setMessages(updatedMessages);
	}

	useEffect(() => { 
		getMessages(); 
		pingRedis();
	}, []);

	return (
		<div className={homeStyles.main}>
			<div className={styles.chat}>
				<div className={styles.feed}>
					<h4 className={styles.chat_title}>{name}</h4>
					<div className={styles.thread}>
						{messages?.map((msg, idx) => {
							return <Bubble text={msg.content} index={idx} key={idx} />
						})}
					</div>

					<div className={styles.input_wrapper}>
						<div className={styles.input_wrapper_top}>
							<textarea 
								value={prompt}
								className={styles.prompt}
								onInput={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => { updatePrompt(e) }}
								placeholder="Message Bunpos"
							></textarea>
						</div>
						<div className={styles.input_wrapper_bottom}>
							<div className={styles.bottom_btns}>
								<div className={styles.btn_group}>
									<img src="media/update.png" />
									<p>Upload</p>
								</div>
							</div>
							<button
								className={styles.submit_btn}
								onClick={() => { handleSend() }}
							>
								<img 
									className={styles.send_img}
									src="media/settings.png" 
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}