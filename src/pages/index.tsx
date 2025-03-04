import styles from "@/styles/home.module.css";
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<title>Bunpos Chat</title>
			<main className={styles.main}>
				<Link href="/chat">Chat</Link>
				<Link href="/cache">Cache</Link>
			</main>
		</>
	)
}