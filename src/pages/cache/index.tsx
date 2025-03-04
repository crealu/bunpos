"use client";
import { useState, useEffect, useMemo, FormEvent } from 'react';

type Pair = {
	key: string,
	value: string,
}

interface CacheProps {
	val: boolean;
	updateVal: (val: boolean) => void;
}

const Cache:React.FC<CacheProps> = ({ val, updateVal }) => {
	const [cache, setCache] = useState<Pair[]>([]);

	async function getCache() {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/redis`);
		const data = await res.json();
		console.log(data.saved);
		if (data.saved && typeof data.saved === 'object') {
			const formattedData = Object.entries(data.saved).map(([key, value]) => ({ key: key, value: value as string }));
			setCache(formattedData);
		} else {
			setCache([]);
		}
		updateVal(false);
	}

	useEffect(() => {
		getCache();
	}, [val]);

	return (
		<div>
			<div>
				{cache?.map((item, idx) => {
					return <div key={idx}>{item.key}: {item.value}</div>
				})}
			</div>
		</div>
	)
}

export default function List() {
    const [key, setKey] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [updated, setUpdated] = useState<boolean>(false);

    async function saveRedis() {
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ key: key, value: value })
		}

		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
		const res = await fetch(`${baseUrl}/api/redis`, options);
		const data = await res.json();
		setUpdated(true);

		console.log(data);
	}

    function updateKey(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setKey(event.currentTarget.value);
	}

	function updateValue(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setValue(event.currentTarget.value);
	}

    return (
        <div>
            <h4>Cache</h4>
            <div>
                <input type="text" value={key} onChange={(e) => { updateKey(e) }} />
                <input type="text" value={value} onChange={(e) => { updateValue(e) }} />
                <button onClick={() => { saveRedis() }}>Save to Redis</button>
                <Cache val={updated} updateVal={setUpdated}/>
            </div>
        </div>
    )
}