"use client";
import styles from "@/styles/chat.module.css"
import homeStyles from "@/styles/home.module.css"
import { useState, useEffect } from 'react';

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

export default function Chat() {
	const [name, setName] = useState<string>('');
	const [messages, setMessages] = useState<string[]>(null);
	const [prompt, setPrompt] = useState<string>('');
	const [agentResponse, setAgentResponse] = useState<string>('');

	async function getMessages() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/messages`);
		const data = await res.json();
		setName(data.name);
		setMessages(data.messages);
	}

	function updatePrompt(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPrompt(event.target.value);
	}

	async function askAgent() {
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ prompt: prompt })
		}

		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/openai`, options);
		const data = await res.json();
		return data.res;
	}

	async function handleSend() {
		const newThread = [...(messages ?? []), prompt];
		setPrompt('');
		setMessages(newThread);

		const response = await askAgent();
		console.log(response);

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
							return <Bubble text={msg} index={idx} key={idx} />
						})}
					</div>

					<div className={styles.input_wrapper}>
						<div className={styles.input_wrapper_top}>
							<textarea 
								value={prompt}
								className={styles.prompt}
								onInput={(e) => { updatePrompt(e) }}
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