"use client";

import styles from "./style.module.scss";

const ESSENTIALS = [
    {
        num: "01",
        title: "Gaming Laptops",
        desc: "RTX-powered. High-refresh displays. Ready to dominate.",
    },
    {
        num: "02",
        title: "Gaming PCs",
        desc: "Custom-built rigs. Your specs, your budget, zero compromise.",
    },
    {
        num: "03",
        title: "Monitors",
        desc: "4K. 240Hz. OLED. The display your setup has been missing.",
    },
    {
        num: "04",
        title: "CCTV Systems",
        desc: "AI-powered surveillance. Day or night, nothing slips through.",
    },
];

export default function Essentials() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <p className={styles.label}>What we carry</p>
                <h2 className={styles.heading}>The essentials.</h2>
            </div>

            <ul className={styles.list}>
                {ESSENTIALS.map((item) => (
                    <li key={item.num} className={styles.item}>
                        <span className={styles.num}>{item.num}</span>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.desc}>{item.desc}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}