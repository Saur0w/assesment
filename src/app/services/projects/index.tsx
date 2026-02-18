"use client";
import React from "react";
import styles from "./style.module.scss";

interface ProjectProps {
    index: number;
    title: string;
    industry: string;
    place: string;
    role: string;
    manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

export default function Index({ index, title, industry, place, role, manageModal }: ProjectProps) {
    return (
        <div
            onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }}
            onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
            className={styles.project}
        >
            <div className={styles.column}>
                <span className={styles.label}>Brand Name</span>
                <h2 className={styles.value}>{title}</h2>
            </div>

            <div className={styles.column}>
                <span className={styles.label}>Industry</span>
                <h2 className={styles.value}>{industry}</h2>
            </div>


            <div className={styles.column}>
                <span className={styles.label}>Country</span>
                <h2 className={styles.value}>{place}</h2>
            </div>

            <div className={`${styles.column} ${styles.large}`}>
                <span className={styles.label}>Role</span>
                <h2 className={styles.value}>{role}</h2>
            </div>
        </div>
    );
}