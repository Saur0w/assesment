"use client";

import styles from './style.module.scss';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href='/services'>Services</Link></li>
                </ul>
            </nav>
        </header>
    )
}