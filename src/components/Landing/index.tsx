'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
    'Gaming Laptops', '✦', 'Monitors', '✦', 'CCTV Systems', '✦',
    'Gaming PCs', '✦', 'Workstations', '✦', 'Accessories', '✦',
];





function Preloader({ onDone }: { onDone: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onDone,
        });

        // Count 0 → 100
        const obj = { val: 0 };
        tl.to(obj, {
            val: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate() {
                if (counterRef.current) {
                    counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, '0');
                }
            },
            onComplete() {
                if (counterRef.current) {
                    counterRef.current.style.opacity = String(0);
                }
            }
        });

        // Slide up panels
        tl.to(`.${styles.preloaderPanel}`, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            stagger: 0.07,
        }, '-=0.3');

        tl.to(ref.current, {
            pointerEvents: 'none',
            duration: 0,
        }, '-=0.1');
    }, { scope: ref });

    return (
        <div ref={ref} className={styles.preloader}>
            {[0, 1, 2].map(i => (
                <div key={i} className={styles.preloaderPanel} />
            ))}
            <div className={styles.preloaderContent}>
                <span ref={counterRef} className={styles.preloaderCounter}>000</span>
            </div>
        </div>
    );
}


function Cursor() {
    const ring = useRef<HTMLDivElement>(null);
    const dot  = useRef<HTMLDivElement>(null);
    const label = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08 });
            gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' });
        };

        const onEnterLink = (e: Event) => {
            const el = e.currentTarget as HTMLElement;
            const lbl = el.dataset.cursor;
            gsap.to(ring.current, { scale: 2.8, duration: 0.35, ease: 'power2.out' });
            if (lbl && label.current) {
                label.current.textContent = lbl;
                gsap.to(label.current, { opacity: 1, duration: 0.2 });
            }
        };

        const onLeaveLink = () => {
            gsap.to(ring.current, { scale: 1, duration: 0.35, ease: 'power2.out' });
            if (label.current) gsap.to(label.current, { opacity: 0, duration: 0.15 });
        };

        window.addEventListener('mousemove', onMove);

        const targets = document.querySelectorAll('[data-cursor]');
        targets.forEach(el => {
            el.addEventListener('mouseenter', onEnterLink);
            el.addEventListener('mouseleave', onLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            targets.forEach(el => {
                el.removeEventListener('mouseenter', onEnterLink);
                el.removeEventListener('mouseleave', onLeaveLink);
            });
        };
    }, []);

    return (
        <>
            <div ref={dot} className={styles.cursorDot} />
            <div ref={ring} className={styles.cursorRing}>
                <span ref={label} className={styles.cursorLabel} />
            </div>
        </>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
    const [loaded, setLoaded] = useState(false);
    const pageRef     = useRef<HTMLDivElement>(null);
    const heroRef     = useRef<HTMLElement>(null);
    const marqueeRef  = useRef<HTMLDivElement>(null);

    // ── Post-preloader entrance
    useGSAP(() => {
        if (!loaded) return;

        const tl = gsap.timeline({ delay: 0.1 });



        // Hero word reveal (clip-path)
        tl.from(`.${styles.heroWord}`, {
            yPercent: 110,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.1,
        }, '-=0.6');

        tl.from(`.${styles.heroMeta}`, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
        }, '-=0.5');

        tl.from(`.${styles.heroCta}`, {
            opacity: 0,
            y: 20,
            scale: 0.92,
            duration: 0.7,
            ease: 'back.out(1.4)',
        }, '-=0.4');

        tl.from(`.${styles.heroScroll}`, {
            opacity: 0,
            duration: 0.6,
        }, '-=0.3');

        tl.from(`.${styles.heroGradientNum}`, {
            opacity: 0,
            x: 40,
            duration: 1,
            ease: 'power3.out',
        }, '-=0.8');

    }, { scope: pageRef, dependencies: [loaded] });

    // ── Marquee
    useGSAP(() => {
        if (!marqueeRef.current) return;
        const w = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
            x: -w,
            duration: 28,
            ease: 'none',
            repeat: -1,
        });
    }, { scope: pageRef });

    // ── Scroll animations
    useGSAP(() => {
        if (!loaded) return;

        // Product rows
        gsap.utils.toArray<HTMLElement>(`.${styles.productRow}`).forEach((row, i) => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: row, start: 'top 82%' },
            });
            tl.from(row.querySelector(`.${styles.productRowIndex}`), {
                opacity: 0, x: -30, duration: 0.5,
            });
            tl.from(row.querySelector(`.${styles.productRowMain}`), {
                opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
            }, '-=0.2');
            tl.from(row.querySelector(`.${styles.productRowPrice}`), {
                opacity: 0, x: 30, duration: 0.5,
            }, '-=0.4');
        });

        // Stats
        gsap.from(`.${styles.statItem}`, {
            opacity: 0, y: 50, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: `.${styles.statsSection}`, start: 'top 80%' },
        });

        // Section headings
        gsap.utils.toArray<HTMLElement>(`.${styles.revealHeading}`).forEach(el => {
            gsap.from(el, {
                yPercent: 100, duration: 1, ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            });
        });

        // Fade ups
        gsap.utils.toArray<HTMLElement>(`.${styles.fadeUp}`).forEach(el => {
            gsap.from(el, {
                opacity: 0, y: 50, duration: 0.85, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
            });
        });

        // Horizontal rule reveal
        gsap.utils.toArray<HTMLElement>(`.${styles.hr}`).forEach(el => {
            gsap.from(el, {
                scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power4.inOut',
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });


        gsap.to(`.${styles.heroBgWord}`, {
            yPercent: 40,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            },
        });

    }, { scope: pageRef, dependencies: [loaded] });

    return (
        <>
            <Preloader onDone={() => setLoaded(true)} />
            <Cursor />

            <div ref={pageRef} className={styles.page}>
                
                <section ref={heroRef} className={styles.hero}>
                    
                    <div className={styles.heroBgWord} aria-hidden>POWER</div>
                    
                    <div className={styles.grain} aria-hidden />
                    
                    <div className={styles.heroGradientNum} aria-hidden>25</div>
                    
                    <div className={styles.heroTitleWrap}>
                        {['Power', 'Your', 'World.'].map((word, i) => (
                            <div key={i} className={styles.heroWordClip}>
                <span className={styles.heroWord} style={{ '--i': i } as React.CSSProperties}>
                  {word}
                </span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.heroBottom}>
                        <div className={styles.heroMeta}>
              <span className={styles.heroPill}>
                <span className={styles.heroPillDot} />
                Est. 2009 · Mumbai
              </span>
                            <p className={styles.heroDesc}>
                                Gaming laptops, PCs, monitors & surveillance — curated, genuine, supported.
                            </p>
                        </div>

                        <div className={styles.heroActions}>
                            <a href="#products" className={styles.heroCta} data-cursor="Explore">
                                <div className={styles.heroCtaCircle}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <span>Explore Products</span>
                            </a>
                            <div className={styles.heroMeta}>
                                <span className={styles.heroStat}>50K+ Customers</span>
                                <span className={styles.heroStatSep}>·</span>
                                <span className={styles.heroStat}>200+ Products</span>
                            </div>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div className={styles.heroScroll}>
                        <div className={styles.heroScrollLine} />
                        <span>Scroll</span>
                    </div>
                </section>

                {/* ── MARQUEE ──────────────────────────────────────────────────── */}
                <div className={styles.marqueeSection}>
                    <div className={styles.marqueeTrack} ref={marqueeRef}>
                        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                            <span key={i} className={styles.marqueeItem}>{item}</span>
                        ))}
                    </div>
                </div>

                {/* ── PRODUCTS ─────────────────────────────────────────────────── */}

            </div>
        </>
    );
}