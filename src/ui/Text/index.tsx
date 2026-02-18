"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./style.module.scss";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface TextProps {
    children: React.ReactNode;
    className?: string;
}

export default function Text({ children, className = "" }: TextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const split = new SplitText(containerRef.current, {
            type: "lines, words",
            mask: "lines",
            linesClass: styles.line,
            wordsClass: styles.word,
        });


        gsap.from(split.words, {
            yPercent: 120,
            duration: 1,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
            },
        });


        return () => split.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`${styles.textContainer} ${className}`}>
            {children}
        </div>
    );
}