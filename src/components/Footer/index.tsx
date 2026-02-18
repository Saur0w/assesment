"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "Roadmap", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Licenses", href: "#" },
        ],
    },
];

const SOCIAL_LINKS = [
    { label: "X", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
];

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const brandRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const marqueeInner = marqueeInnerRef.current;
            if (marqueeInner) {
                gsap.to(marqueeInner, {
                    xPercent: -50,
                    duration: 18,
                    ease: "none",
                    repeat: -1,
                });
            }
            if (brandRef.current) {
                gsap.fromTo(
                    brandRef.current.querySelectorAll(`.${styles.animItem}`),
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }

            // Columns stagger reveal
            if (columnsRef.current) {
                gsap.fromTo(
                    columnsRef.current.querySelectorAll(`.${styles.column}`),
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }

            if (bottomRef.current) {
                gsap.fromTo(
                    bottomRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: bottomRef.current,
                            start: "top 95%",
                        },
                    }
                );
            }

            const line = footerRef.current?.querySelector(`.${styles.dividerLine}`);
            if (line) {
                gsap.fromTo(
                    line,
                    { scaleX: 0, transformOrigin: "left center" },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }
        },
        { scope: footerRef }
    );

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div ref={marqueeRef} className={styles.marquee}>
                <div ref={marqueeInnerRef} className={styles.marqueeInner}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className={styles.marqueeItem}>
              Build Better &nbsp;<em>·</em>&nbsp; Ship Faster &nbsp;<em>·</em>&nbsp; Design with Intention &nbsp;<em>·</em>&nbsp;
            </span>
                    ))}
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.top}>
                    <div ref={brandRef} className={styles.brand}>
                        <div className={`${styles.logo} ${styles.animItem}`}>
                            <span className={styles.logoMark}><Image src='/images/logo.png' alt="logo" height={400} width={400} /> </span>
                        </div>

                        <p className={`${styles.tagline} ${styles.animItem}`}>
                            Crafting digital experiences that linger long after the tab is closed.
                        </p>

                        <div className={`${styles.socials} ${styles.animItem}`}>
                            {SOCIAL_LINKS.map(({ label, href }) => (
                                <a key={label} href={href} className={styles.socialLink} aria-label={label}>
                                    {label}
                                </a>
                            ))}
                        </div>

                        <div className={`${styles.newsletter} ${styles.animItem}`}>
                            <p className={styles.newsletterLabel}>Stay in the loop</p>
                            <div className={styles.newsletterForm}>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className={styles.input}
                                    aria-label="Email address"
                                />
                                <button className={styles.submitBtn} type="submit">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Nav columns */}
                    <div ref={columnsRef} className={styles.columns}>
                        {FOOTER_COLUMNS.map(({ title, links }) => (
                            <div key={title} className={styles.column}>
                                <h3 className={styles.columnTitle}>{title}</h3>
                                <ul className={styles.linkList}>
                                    {links.map(({ label, href }) => (
                                        <li key={label}>
                                            <a href={href} className={styles.link}>
                                                <span className={styles.linkArrow}>↗</span>
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.dividerLine} />

                {/* Bottom bar */}
                <div ref={bottomRef} className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Studio. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;