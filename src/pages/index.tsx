import styles from "@/styles/home.module.css";

export default function Home() {
	return (
		<>
			<title>Bunpos Chat</title>
			<main className={styles.main}>
				<a href="/chat">Chat</a>
			</main>
		</>
	)
}