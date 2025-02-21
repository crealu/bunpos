import styles from "@/styles/home.module.css";

export default function Splitter() {
	return (
		<div className={styles.client_comp}>
			<button className={styles.split_btn}>Split</button>
			<input className={styles.sentence_inp} />
		</div>
	)
}