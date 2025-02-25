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

const Thread:React.FC<ThreadProps> = ({ messages }) => {
	return (
		<div className={styles.thread}>
			{messages?.map((msg, idx) => {
				return <Bubble text={msg.content} index={idx} key={idx} />
			})}
		</div>
	)
}


export default function Chat() {
	const [name, setName] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([{ role: '', content: '' }]);
	const [prompt, setPrompt] = useState<string>('');
	const [tail, setTail] = useState<string[]>(['']);

	async function getMessages() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/messages`);
		const data = await res.json();
		setName(data.name);

		data.messages.splice(0, 1);

		setMessages(data.messages);
	}

	function updatePrompt(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPrompt(event.currentTarget.value);
		// setPrompt(event.target.value);
	}

	async function askAgent() {
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ prompt: prompt, tail: tail })
		}

		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/openai`, options);
		const data = await res.json();
		return data.res;
	}

	async function handleSend() {
		const newMessage = {
			role: 'user',
			conten: prompt
		}
		const newThread = [...(messages ?? []), newMessage];
		setPrompt('');
		setMessages(newThread);

		const theTail = messages.length >= 4 ? messages.slice(messages.length - 4) : messages;
		setTail(theTail);

		const response = await askAgent();

		const updatedMessages = [...newThread, response];
		setMessages(updatedMessages);
	}

	useEffect(() => { getMessages(); }, []);

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