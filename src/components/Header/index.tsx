"use client";

import styles from './style.module.scss';
import Link from "next/link";
import Magnetic from "@/ui/Magnetic/index";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <Magnetic>
                            <Link href="/">Home</Link>
                        </Magnetic></li>
                    <li><
                        Magnetic>
                            <Link href="/about">About</Link>
                        </Magnetic></li>
                    <li>
                        <Magnetic>
                            <Link href='/services'>Services</Link>
                        </Magnetic>
                    </li>
                </ul>
            </nav>
        </header>
    )
}