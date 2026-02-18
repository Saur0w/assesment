"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Text from "@/ui/Text";
import styles from "./style.module.scss";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: "15+", label: "Years of\nExperience" },
    { value: "200+", label: "Projects\nDelivered" },
    { value: "50+", label: "Enterprise\nClients" },
    { value: "12",  label: "Industry\nSectors" },
];

export default function AboutPage() {
    const sectionRef    = useRef<HTMLElement>(null);
    const indexRef      = useRef<HTMLSpanElement>(null);
    const headingRef    = useRef<HTMLDivElement>(null);
    const lineRef       = useRef<HTMLDivElement>(null);
    const statsRef      = useRef<HTMLDivElement>(null);
    const secondaryRef  = useRef<HTMLDivElement>(null);
    const bottomLineRef = useRef<HTMLDivElement>(null);
    const tagRef        = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom bottom",
                    once: true,
                },
                defaults: { ease: "power3.out" },
            });
            tl.fromTo(
                indexRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                0
            );

            tl.fromTo(
                tagRef.current,
                { y: -16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                0.1
            );

            tl.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 1, ease: "power4.inOut" },
                0.15
            );

            tl.fromTo(
                headingRef.current,
                { y: 48, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                0.3
            );

            tl.fromTo(
                statsRef.current!.querySelectorAll(`.${styles.stat}`),
                { y: 32, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
                0.55
            );

            tl.fromTo(
                secondaryRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.7
            );

            tl.fromTo(
                bottomLineRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 1, ease: "power4.inOut" },
                0.8
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={styles.about}>

            <div className={styles.topRow}>
                <span ref={indexRef} className={styles.sectionIndex}>02</span>
                <div ref={tagRef} className={styles.tag}>
                    <span className={styles.tagDot} aria-hidden />
                    Who We Are
                </div>
            </div>

            <div ref={lineRef} className={styles.rule} aria-hidden />

            <div ref={headingRef} className={styles.heading}>
                <h1 className={styles.h1}>
                    <em>Building</em> the digital<br />
                    infrastructure of<br />
                    <em>tomorrow.</em>
                </h1>
            </div>

            <div className={styles.bodyGrid}>

                <div className={styles.text}>
                    <Text>
                        <p>
                            Usha Info Tech is a forward-thinking technology company committed to
                            delivering innovative, scalable, and secure digital solutions. We specialize
                            in building modern web applications, enterprise software systems, and custom
                            IT services that help businesses streamline operations and accelerate growth.
                        </p>
                    </Text>
                </div>

                <div ref={statsRef} className={styles.stats}>
                    {STATS.map(({ value, label }) => (
                        <div key={value} className={styles.stat}>
                            <span className={styles.statValue}>{value}</span>
                            <span className={styles.statLabel}>
                                {label.split("\n").map((line, i) => (
                                    <span key={i}>{line}</span>
                                ))}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div ref={secondaryRef} className={styles.secondary}>
                <div className={styles.secondaryInner}>
                    <span className={styles.secondaryMark} aria-hidden>—</span>
                    <Text>
                        <p className={styles.secondaryText}>
                            From startups to large enterprises, we partner with organizations across
                            industries to translate complex challenges into elegant, high-performing
                            technology. Our team combines deep engineering expertise with a sharp product
                            mindset to ship software that lasts.
                        </p>
                    </Text>
                </div>
            </div>

            <div ref={bottomLineRef} className={styles.rule} aria-hidden />

        </section>
    );
}