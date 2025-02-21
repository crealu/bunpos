"use client";
import styles from "@/styles/home.module.css";
import ServerProps from '../components/ServerProps';
import { useState, useEffect } from 'react';

// Best for data that updates frequently (e.g., real-time data, chat messages, stock prices).
// Keeps the initial page load fast because the page renders first, then fetches data.
// The page won't be pre-rendered with data, so SEO might suffer.

export default function Home() {
	const [data, setData] = useState({})

	async function getProps() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/hello`);
		const data = await res.json();

		setData(data);
	}

	useEffect(() => { getProps() }, [])

	return <ServerProps data={data} />
}