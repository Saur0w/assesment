"use client";

import styles from "./style.module.scss";
import Text from "@/ui/Text/index";

export default function Des() {
    return (
        <section className={styles.des}>
            <div className={styles.head}>
                <h1>Innovating Your <br />Digital Future</h1>
            </div>
            <div className={styles.text}>
                <Text>
                    <p>
                        Usha InfoTech is a forward-thinking IT solutions provider dedicated to empowering businesses through cutting-edge technology.<br />
                        We specialize in custom software development, cloud integration, and digital transformation strategies tailored to meet the <br />unique needs of our clients.<br />
                    </p>
                </Text>
            </div>
        </section>
    );
}