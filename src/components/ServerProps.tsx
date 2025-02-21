import styles from "@/styles/home.module.css";

export default function ServerProps({ data }) {
	return (
		<div className={styles.rendered}>
			<h3>Rendered with getServerSideProps</h3>
			<p>Name: {data?.name}, Count: {data?.count}</p>
		</div>
	)
}