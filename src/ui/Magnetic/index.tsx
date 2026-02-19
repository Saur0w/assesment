"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magnetic.current?.addEventListener("mousemove", handleMouseMove);
        magnetic.current?.addEventListener("mouseleave", handleMouseLeave);
    }, { scope: magnetic });

    return (
        <div ref={magnetic} style={{ display: "inline-block" }}>
            {children}
        </div>
    );
}