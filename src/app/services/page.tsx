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
    { title: "Essence Persia",      industry: "Beauty",                  place: "Switzerland",   role: "Design and Development", color: "#6a1b1b",  src: "essence.jpg"  },
    { title: "Comert Photography",  industry: "Photography",             place: "Netherlands",   role: "Design and Development", color: "#000000",  src: "comert.jpg"   },
    { title: "Bushdid Smiles",      industry: "Healthcare",              place: "United States", role: "Design and Development", color: "#e1cb91",  src: "smiles.jpg"   },
    { title: "Tomac",               industry: "Construction",            place: "Australia",     role: "Design and Development", color: "#e6bc2f",  src: "Tomac.jpg"    },
    { title: "Baby Buri",           industry: "Children's Entertainment",place: "United States", role: "Design and Development", color: "#d8cf94",  src: "Baby.jpg"     },
];

export default function Work() {
    const [modal, setModal] = useState({ active: false, index: 0 });
    const { active, index } = modal;

    // ── DOM refs ──────────────────────────────────────────────────────────────
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalSliderRef    = useRef<HTMLDivElement>(null);
    const cursorRef         = useRef<HTMLDivElement>(null);
    const cursorLabelRef    = useRef<HTMLDivElement>(null);

    // ── GSAP quickTo refs ─────────────────────────────────────────────────────
    const xMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const yMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

    // ── Init quickTo functions (runs once after mount) ────────────────────────
    useGSAP(() => {
        if (
            !modalContainerRef.current ||
            !cursorRef.current ||
            !cursorLabelRef.current
        ) return;

        xMoveContainer.current   = gsap.quickTo(modalContainerRef.current, "left", { duration: 0.8,  ease: "power3" });
        yMoveContainer.current   = gsap.quickTo(modalContainerRef.current, "top",  { duration: 0.8,  ease: "power3" });
        xMoveCursor.current      = gsap.quickTo(cursorRef.current,         "left", { duration: 0.5,  ease: "power3" });
        yMoveCursor.current      = gsap.quickTo(cursorRef.current,         "top",  { duration: 0.5,  ease: "power3" });
        xMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    "left", { duration: 0.45, ease: "power3" });
        yMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    "top",  { duration: 0.45, ease: "power3" });
    }, []);

    // ── Scale in/out on active change ─────────────────────────────────────────
    useGSAP(() => {
        if (
            !modalContainerRef.current ||
            !cursorRef.current ||
            !cursorLabelRef.current
        ) return;

        gsap.to(
            [modalContainerRef.current, cursorRef.current, cursorLabelRef.current],
            {
                scale:    active ? 1 : 0,
                duration: 0.4,
                ease:     active ? "power3.out" : "power3.in",
            }
        );
    }, [active]);

    // ── Slide modal strip to active project ──────────────────────────────────
    useGSAP(() => {
        if (!modalSliderRef.current) return;

        gsap.to(modalSliderRef.current, {
            top:      `${index * -100}%`,
            duration: 0.5,
            ease:     "power3.inOut",
        });
    }, [index]);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const moveItems = (x: number, y: number) => {
        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveCursorLabel.current?.(x);
        yMoveCursorLabel.current?.(y);
    };

    const manageModal = (
        isActive: boolean,
        idx: number,
        x: number,
        y: number
    ) => {
        moveItems(x, y);
        setModal({ active: isActive, index: idx });
    };

    return (
        <main
            className={styles.work}
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
        >
            {/* ── Project list ── */}
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

            {/* ── Hover modal ──
           THIS is what was missing — the divs the refs point to.
      ── */}
            <div ref={modalContainerRef} className={styles.modalContainer}>
                <div ref={modalSliderRef} className={styles.modalSlider}>
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className={styles.modal}
                            style={{ backgroundColor: project.color }}
                        >
                            <Image
                                src={`/images/${project.src}`}
                                alt={project.title}
                                width={260}
                                height={200}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Custom cursor ── */}
            <div ref={cursorRef} className={styles.cursor} />

            {/* ── Cursor label ── */}
            <div ref={cursorLabelRef} className={styles.cursorLabel}>
                View
            </div>
        </main>
    );
}