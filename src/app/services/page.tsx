"use client";

import styles from "./style.module.scss";
import Project from "./projects/index";
import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WorkProps {
    title: string;
    industry: string;
    place: string;
    role: string;
    src: string;
    color: string;
}

const projects: WorkProps[] = [
    { title: "ASUS ROG Strix G16",     industry: "Gaming Laptop",  place: "RTX 4070 · 240Hz",   role: "Starting ₹1,49,990", color: "#0d2010", src: "asus-rog.jpg"      },
    { title: "Destroyer X Pro",        industry: "Gaming PC",      place: "RTX 4090 · Ryzen 9", role: "Starting ₹1,89,990", color: "#1a0d0d", src: "destroyer-x.jpg"   },
    { title: "LG UltraGear 27\" 4K",  industry: "Monitor",        place: "4K · 160Hz · IPS",   role: "Starting ₹54,990",   color: "#0d1520", src: "lg-ultragear.jpg"  },
    { title: "Hikvision AcuSense",     industry: "CCTV System",    place: "4MP · AI Detect",    role: "Starting ₹4,290",    color: "#1a150a", src: "hikvision.jpg"     },
    { title: "Dell XPS 15 OLED",       industry: "Laptop",         place: "OLED · Core i7",     role: "Starting ₹1,49,990", color: "#110d1a", src: "dell-xps.jpg"      },
];

export default function Work() {
    const [modal, setModal] = useState({ active: false, index: 0 });
    const { active, index } = modal;

    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalSliderRef    = useRef<HTMLDivElement>(null);
    const cursorRef         = useRef<HTMLDivElement>(null);
    const cursorLabelRef    = useRef<HTMLDivElement>(null);

    const xMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const yMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        if (!modalContainerRef.current || !cursorRef.current || !cursorLabelRef.current) return;

        xMoveContainer.current   = gsap.quickTo(modalContainerRef.current, "left", { duration: 0.8,  ease: "power3" });
        yMoveContainer.current   = gsap.quickTo(modalContainerRef.current, "top",  { duration: 0.8,  ease: "power3" });
        xMoveCursor.current      = gsap.quickTo(cursorRef.current,         "left", { duration: 0.5,  ease: "power3" });
        yMoveCursor.current      = gsap.quickTo(cursorRef.current,         "top",  { duration: 0.5,  ease: "power3" });
        xMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    "left", { duration: 0.45, ease: "power3" });
        yMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    "top",  { duration: 0.45, ease: "power3" });
    }, []);

    useGSAP(() => {
        if (!modalContainerRef.current || !cursorRef.current || !cursorLabelRef.current) return;
        gsap.to(
            [modalContainerRef.current, cursorRef.current, cursorLabelRef.current],
            { scale: active ? 1 : 0, duration: 0.4, ease: active ? "power3.out" : "power3.in" }
        );
    }, [active]);

    useGSAP(() => {
        if (!modalSliderRef.current) return;
        gsap.to(modalSliderRef.current, { top: `${index * -100}%`, duration: 0.5, ease: "power3.inOut" });
    }, [index]);

    const moveItems = (x: number, y: number) => {
        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveCursorLabel.current?.(x);
        yMoveCursorLabel.current?.(y);
    };

    const manageModal = (isActive: boolean, idx: number, x: number, y: number) => {
        moveItems(x, y);
        setModal({ active: isActive, index: idx });
    };

    return (
        <main
            className={styles.work}
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
        >
            <div className={styles.body}>
                {projects.map((project, i) => (
                    <Project
                        key={i}
                        index={i}
                        title={project.title}
                        industry={project.industry}
                        place={project.place}
                        role={project.role}
                        manageModal={manageModal}
                    />
                ))}
            </div>

            <div ref={modalContainerRef} className={styles.modalContainer}>
                <div ref={modalSliderRef} className={styles.modalSlider}>
                    {projects.map((project, i) => (
                        <div key={i} className={styles.modal} style={{ backgroundColor: project.color }}>
                            <Image
                                src={`/images/products/${project.src}`}
                                alt={project.title}
                                width={380}
                                height={320}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div ref={cursorRef} className={styles.cursor} />
            <div ref={cursorLabelRef} className={styles.cursorLabel}>View</div>
        </main>
    );
}