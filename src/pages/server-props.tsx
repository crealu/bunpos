// import styles from "@/styles/home.module.css";
import ServerProps from '../components/ServerProps';

// Best for dynamic data that must be up-to-date on every request (e.g., user-specific dashboards, frequently changing API data).
// Not ideal if the data doesn’t change often, since it will make a server request on every page load.
export async function getServerSideProps() {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
	const res = await fetch(`${baseUrl}/api/hello`);
	const data = await res.json();

	return { props: { data } };
}

export default function Home({ data }: { data: { name: string; count: number }}) {
	return <ServerProps data={data} />
}