"use client";
import styles from "@/styles/resnshu.module.css";
import { useState } from 'react';

export default function Renshu() {
	const [cursorLocation, setCursorLocation] = useState<number>(0);

	return (
		<div>
			<div className={styles.jem_sentence}>

			</div>
		</div>
	)
}