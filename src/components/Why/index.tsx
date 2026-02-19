'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type CardSize = 'wide' | 'tall' | 'small' | 'featured';

interface Card {
    id: string;
    size: CardSize;
    icon: string;
    label: string;
    title: string;
    desc: string;
    accent: string;
    detail?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const cards: Card[] = [
    {
        id: '01',
        size: 'featured',
        icon: '◈',
        label: 'Authenticity',
        title: '100% Genuine. Always.',
        desc: 'Every laptop we sell is sourced directly from authorised distributors with full manufacturer warranty. Zero grey market, zero refurbished stock passed as new.',
        accent: '#2ab98d',
        detail: 'Verified with official serial numbers',
    },
    {
        id: '02',
        size: 'tall',
        icon: '◎',
        label: 'Expertise',
        title: 'Advice from real specialists',
        desc: "Our in-store technicians help you pick the right machine for your actual workload — not whatever's highest margin.",
        accent: '#2a8abf',
        detail: 'Free consultation, no pressure',
    },
    {
        id: '03',
        size: 'small',
        icon: '⬡',
        label: 'Financing',
        title: 'Zero-cost EMI',
        desc: 'Split your purchase over 3–24 months with 0% interest on select banks.',
        accent: '#c6a022',
    },
    {
        id: '04',
        size: 'small',
        icon: '↺',
        label: 'Trade-In',
        title: 'Trade your old laptop',
        desc: 'Get instant value for your old device, applied directly to your new purchase.',
        accent: '#a022c6',
    },
    {
        id: '05',
        size: 'wide',
        icon: '◉',
        label: 'Setup',
        title: 'Ready to use, out of the box',
        desc: 'Free OS installation, driver setup, antivirus activation, and data migration from your old device — on us.',
        accent: '#2ab98d',
        detail: 'Same-day setup available',
    },
    {
        id: '06',
        size: 'small',
        icon: '⊕',
        label: 'Returns',
        title: '30-day no-questions return',
        desc: 'Changed your mind? Return within 30 days, hassle-free, full refund.',
        accent: '#bf4a2a',
    },
    {
        id: '07',
        size: 'small',
        icon: '★',
        label: 'Price',
        title: 'Best price guarantee',
        desc: "Find a lower price anywhere in India? We'll match it on the spot.",
        accent: '#c6a022',
    },
    {
        id: '08',
        size: 'tall',
        icon: '◫',
        label: 'Support',
        title: 'Dedicated after-sales service',
        desc: 'Our in-house service center handles everything post-purchase — repairs, upgrades, and warranty claims — so you never feel alone after you buy.',
        accent: '#2a8abf',
        detail: 'Avg. 24h turnaround',
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WhyBuySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // ── Heading animation
            const headingTl = gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            headingTl
                .from(`.${styles.sectionEyebrow}`, {
                    opacity: 0,
                    x: -20,
                    duration: 0.6,
                    ease: 'power3.out',
                })
                .from(
                    `.${styles.sectionHeading}`,
                    {
                        opacity: 0,
                        y: 50,
                        duration: 0.9,
                        ease: 'power4.out',
                    },
                    '-=0.3'
                )
                .from(
                    `.${styles.sectionSub}`,
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.5'
                );

            // ── Card stagger reveal
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 70,
                        scale: 0.96,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.85,
                        ease: 'power3.out',
                        delay: (i % 4) * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    }
                );

                // ── Icon float on enter
                const icon = card.querySelector(`.${styles.cardIcon}`);
                if (icon) {
                    gsap.fromTo(
                        icon,
                        { scale: 0.5, opacity: 0, rotation: -15 },
                        {
                            scale: 1,
                            opacity: 1,
                            rotation: 0,
                            duration: 0.6,
                            ease: 'back.out(1.7)',
                            delay: (i % 4) * 0.1 + 0.25,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 88%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                }

                // ── Hover: lift & glow
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' });
                    const line = card.querySelector(`.${styles.cardAccentLine}`);
                    if (line) gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { y: 0, duration: 0.5, ease: 'power2.out' });
                    const line = card.querySelector(`.${styles.cardAccentLine}`);
                    if (line) gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power3.in' });
                });
            });

            // ── Subtle parallax on featured card background
            gsap.to(`.${styles.cardFeaturedBg}`, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* ── Heading ─────────────────────────────────────────────────── */}
            <div ref={headingRef} className={styles.heading}>
                <span className={styles.sectionEyebrow}>Why Choose Us</span>
                <h2 className={styles.sectionHeading}>
                    The best place to buy<br />
                    <em>your next laptop.</em>
                </h2>
                <p className={styles.sectionSub}>
                    From picking the right spec to setting it up and supporting it for years —
                    we&#39;re with you at every step.
                </p>
            </div>

            {/* ── Bento Grid ──────────────────────────────────────────────── */}
            <div ref={gridRef} className={styles.grid}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`${styles.card} ${styles[`card--${card.size}`]}`}
                        style={{ '--card-accent': card.accent } as React.CSSProperties}
                    >
                        {/* Featured card has a decorative BG layer */}
                        {card.size === 'featured' && (
                            <div className={styles.cardFeaturedBg} aria-hidden />
                        )}

                        <div className={styles.cardInner}>
                            <div className={styles.cardTop}>
                                <span className={styles.cardLabel}>{card.label}</span>
                                <span className={styles.cardId}>{card.id}</span>
                            </div>

                            <span className={styles.cardIcon}>{card.icon}</span>

                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDesc}>{card.desc}</p>
                                {card.detail && (
                                    <span className={styles.cardDetail}>
                    <span className={styles.cardDetailDot} />
                                        {card.detail}
                  </span>
                                )}
                            </div>
                        </div>

                        {/* Hover accent underline — GSAP drives scaleX */}
                        <div className={styles.cardAccentLine} />
                    </div>
                ))}
            </div>
        </section>
    );
}