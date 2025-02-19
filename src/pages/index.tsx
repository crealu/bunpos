import styles from "@/styles/home.module.css";
import handler from './api/hello';

export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/api/hello");
	const data = await res.json();

	return { props: { data } };
}

export default function Home({ data }: { data: { name: string; count: number } }) {
	return (
		<>
			<title>Bunpos Custom Next App</title>

			<main className={styles.main}>
				<div className={styles.rendered}>
					<h3>Rendered with getServerSideProps</h3>
					<p>Name: {data.name}, Count: {data.count}</p>
				</div>

				<div className={styles.client_comp}>
					<button className={styles.split_btn}>Split</button>
					<input className={styles.sentence_inp} />
				</div>
			</main>
		</>
	)
}