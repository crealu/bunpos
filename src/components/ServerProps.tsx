import styles from "@/styles/home.module.css";

interface Data {
	name: string;
	count: number;
}

export default function ServerProps({ data } : Data) {
	return (
		<div className={styles.rendered}>
			<h3>Rendered with getServerSideProps</h3>
			<p>Name: {data?.name}, Count: {data?.count}</p>
		</div>
	)
}