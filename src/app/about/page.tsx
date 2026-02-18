"use client";

import Text from "@/ui/Text";
import styles from "./style.module.scss";

export default function AboutPage() {
    return (
        <section className={styles.about}>
            <div className={styles.heading}>
                <h1>About Us</h1>
            </div>
            <div className={styles.text}>
                <Text>
                    <p>
                        Usha Info Tech is a forward-thinking technology company committed to delivering innovative, scalable, and secure digital solutions.<br />
                        We specialize in building modern web applications, enterprise software systems, and custom IT services that help businesses streamline operations and accelerate growth.<br />
                    </p>
                </Text>
            </div>
        </section>
    )
}