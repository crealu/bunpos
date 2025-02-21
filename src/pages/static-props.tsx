import styles from "@/styles/home.module.css";
import ServerProps from '../components/ServerProps';

// Best for data that doesn't change often (e.g., blog posts, documentation).
// More performant than getServerSideProps because the page is pre-rendered at build time.
// Not good if the data must be updated frequently.
export async function getStaticProps() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
	const res = await fetch(`${baseUrl}/api/hello`);
	const data = await res.json();

	return { props: { data } };
}

export default function Home({ data }: { data: { name: string; count: number }}) {
	return <ServerProps data={data} />
}