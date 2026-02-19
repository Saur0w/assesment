"use client";

import styles from "./style.module.scss";
import Text from "@/ui/Text/index";

export default function Des() {
    return (
        <section className={styles.des}>
            <div className={styles.head}>
                <h1>Your Ultimate<br />Tech Destination.</h1>
            </div>
            <div className={styles.text}>
                <Text>
                    <p>
                        Usha Infotech is Mumbai&#39;s go-to store for premium technology.
                        From high-performance gaming laptops and custom-built PCs to
                        4K monitors and professional CCTV systems — we carry it all,
                        genuine and warranty-backed.
                        Walk in, get expert advice, walk out with exactly what you need.
                    </p>
                </Text>
            </div>
        </section>
    );
}