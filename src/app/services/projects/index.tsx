"use client";
import React from "react";
import styles from "./style.module.scss";

interface ProjectProps {
    index: number;
    title: string;
    type: string;
    property: string;
    price: string;
    manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

export default function Index({ index, title, type, property, price, manageModal }: ProjectProps) {
    return (
        <div
            onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }}
            onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
            className={styles.project}
        >
            <div className={styles.column}>
                <span className={styles.label}>Name</span>
                <h2 className={styles.value}>{title}</h2>
            </div>

            <div className={styles.column}>
                <span className={styles.label}>Class</span>
                <h2 className={styles.value}>{type}</h2>
            </div>


            <div className={styles.column}>
                <span className={styles.label}>Property</span>
                <h2 className={styles.value}>{property}</h2>
            </div>

            <div className={`${styles.column} ${styles.large}`}>
                <span className={styles.label}>Price</span>
                <h2 className={styles.value}>{price}</h2>
            </div>
        </div>
    );
}