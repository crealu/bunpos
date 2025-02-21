import styles from "@/styles/home.module.css";
import Chat from './components/Chat';
import Splitter from './components/Splitter';

export default function Home({ data }: { data: { name: string; count: number }}) {
	return (
		<>
			<title>Bunpos Chat</title>
			<main className={styles.main}>
				{/*<Splitter />*/}
				<Chat />
			</main>
		</>
	)
}