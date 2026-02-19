'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';
import Text from "@/ui/Text/index";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
    index: string;
    category: string;
    name: string;
    price: string;
    originalPrice?: string;
    tag: string;
    tagColor: string;
    desc: string;
    src: string;           // /images/products/<filename>
    accentColor: string;   // card background tint for the modal
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Drop real product photos into /public/images/products/
// Names here are just placeholders — swap freely.

const PRODUCTS: Product[] = [
    {
        index: '01',
        category: 'Gaming Laptop',
        name: 'ASUS ROG Strix G16',
        price: '₹1,49,990',
        tag: 'RTX 4070',
        tagColor: '#22c678',
        desc: 'Dominate every session with a QHD 240 Hz display and Intel i9-14900HX.',
        src: '/images/g16.jpg',
        accentColor: '#0d2818',
    },
    {
        index: '02',
        category: 'Gaming Laptop',
        name: 'Alienware x14',
        price: '₹1,89,990',
        tag: 'RTX 4090',
        tagColor: '#00a7fd',
        desc: 'The most powerful rig we carry. Ryzen 9 + 64 GB DDR5. Built for zero compromises.',
        src: '/images/alienware.avif',
        accentColor: '#1a0d0d',
    },
    {
        index: '03',
        category: 'Monitor',
        name: 'LG UltraGear 27" 4K',
        price: '₹54,990',
        originalPrice: '₹64,990',
        tag: '4K 160 Hz',
        tagColor: '#2a8abf',
        desc: 'Nano IPS. HDMI 2.1. 1 ms GtG. The panel your setup has been waiting for.',
        src: '/images/lg.avif',
        accentColor: '#0d1a26',
    },
    {
        index: '04',
        category: 'CCTV System',
        name: 'Hikvision AcuSense 4 MP',
        price: '₹4,290',
        tag: 'AI Detect',
        tagColor: '#c6a022',
        desc: 'Smart motion alerts. ColorVu full-colour night vision. 24/7 peace of mind.',
        src: '/images/hk.webp',
        accentColor: '#1a160a',
    },
    {
        index: '05',
        category: 'Laptop',
        name: 'Dell XPS 15 OLED',
        price: '₹1,49,990',
        tag: 'OLED Touch',
        tagColor: '#9b6dff',
        desc: 'Core i7-13700H. 32 GB. Stunning 3.5 K OLED display in a machined aluminium shell.',
        src: '/images/xps.jpg',
        accentColor: '#110d1a',
    },
    {
        index: '06',
        category: 'Gaming Laptop',
        name: 'MSI Raider GE78 HX',
        price: '₹1,89,990',
        tag: 'RTX 4080',
        tagColor: '#ff4d4d',
        desc: 'i9-14900HX · 64 GB DDR5 · 17" QHD+ 240 Hz — the flagship that earns its price.',
        src: '/images/msi.jpg',
        accentColor: '#1a0d0d',
    },
];

// ─── Row subcomponent ─────────────────────────────────────────────────────────

interface RowProps {
    product: Product;
    index: number;
    onHover: (active: boolean, idx: number, x: number, y: number) => void;
}

function ProductRow({ product, index, onHover }: RowProps) {
    return (
        <div
            className={styles.row}
            onMouseEnter={(e) => onHover(true,  index, e.clientX, e.clientY)}
            onMouseLeave={(e) => onHover(false, index, e.clientX, e.clientY)}
        >
            <span className={styles.rowIndex}>{product.index}</span>

            <div className={styles.rowMain}>
        <span
            className={styles.rowCategory}
            style={{ '--cat-color': product.tagColor } as React.CSSProperties}
        >
          {product.category}
        </span>
                <h3 className={styles.rowName}>{product.name}</h3>
                <p className={styles.rowDesc}>{product.desc}</p>
            </div>

            <div className={styles.rowRight}>
        <span
            className={styles.rowTag}
            style={{ '--tag-color': product.tagColor } as React.CSSProperties}
        >
          {product.tag}
        </span>
                <div className={styles.rowPricing}>
                    <span className={styles.rowPrice}>{product.price}</span>
                    {product.originalPrice && (
                        <span className={styles.rowOriginal}>{product.originalPrice}</span>
                    )}
                </div>
                <a href="#contact" className={styles.rowArrow} aria-label="Enquire">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9H15M15 9L10 4M15 9L10 14"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </a>
            </div>

            {/* Bottom rule — animates on hover via CSS */}
            <div className={styles.rowRule} />
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Modal / cursor refs
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalSliderRef    = useRef<HTMLDivElement>(null);
    const cursorRef         = useRef<HTMLDivElement>(null);
    const cursorLabelRef    = useRef<HTMLDivElement>(null);

    // GSAP quickTo refs
    const xMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const yMoveContainer   = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor      = useRef<gsap.QuickToFunc | null>(null);
    const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

    const [modal, setModal] = useState({ active: false, index: 0 });

    // ── Init quickTo ────────────────────────────────────────────────────────────
    useGSAP(() => {
        xMoveContainer.current   = gsap.quickTo(modalContainerRef.current, 'left', { duration: 0.8,  ease: 'power3' });
        yMoveContainer.current   = gsap.quickTo(modalContainerRef.current, 'top',  { duration: 0.8,  ease: 'power3' });
        xMoveCursor.current      = gsap.quickTo(cursorRef.current,         'left', { duration: 0.5,  ease: 'power3' });
        yMoveCursor.current      = gsap.quickTo(cursorRef.current,         'top',  { duration: 0.5,  ease: 'power3' });
        xMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    'left', { duration: 0.45, ease: 'power3' });
        yMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current,    'top',  { duration: 0.45, ease: 'power3' });
    }, []);

    // ── Scale in / out on hover toggle ─────────────────────────────────────────
    useGSAP(() => {
        const targets = [
            modalContainerRef.current,
            cursorRef.current,
            cursorLabelRef.current,
        ];
        gsap.to(targets, {
            scale:    modal.active ? 1 : 0,
            duration: 0.4,
            ease:     modal.active ? 'power3.out' : 'power3.in',
        });
    }, [modal.active]);

    // ── Slide the strip to the right image ─────────────────────────────────────
    useGSAP(() => {
        gsap.to(modalSliderRef.current, {
            top:      `${modal.index * -100}%`,
            duration: 0.5,
            ease:     'power3.inOut',
        });
    }, [modal.index]);

    // ── Section scroll reveal ───────────────────────────────────────────────────
    useGSAP(() => {
        gsap.from(`.${styles.heading}`, {
            opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        });
        gsap.from(`.${styles.row}`, {
            opacity: 0, y: 50, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: `.${styles.list}`, start: 'top 80%' },
        });
        gsap.from(`.${styles.divider}`, {
            scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power4.inOut',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        });
    }, { scope: sectionRef });

    // ── Mouse helpers ───────────────────────────────────────────────────────────
    const moveItems = (x: number, y: number) => {
        xMoveContainer.current?.(x);
        yMoveContainer.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveCursorLabel.current?.(x);
        yMoveCursorLabel.current?.(y);
    };

    const handleHover = (active: boolean, idx: number, x: number, y: number) => {
        moveItems(x, y);
        setModal({ active, index: idx });
    };

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
            id="products"
        >
            <div className={styles.heading}>
                <div className={styles.headingLeft}>
                    <span className={styles.eyebrow}>Featured Products</span>
                    <h2 className={styles.title}>What we sell.</h2>
                </div>
                <p className={styles.subtitle}>
                    From entry-level builds to enthusiast rigs — every product is sourced
                    direct from authorised distributors with full manufacturer warranty.
                </p>
            </div>

            <div className={styles.divider} />

            {/* ── Product rows ─────────────────────────────────────────────── */}
            <div className={styles.list}>
                {PRODUCTS.map((p, i) => (
                    <ProductRow
                        key={p.index}
                        product={p}
                        index={i}
                        onHover={handleHover}
                    />
                ))}
            </div>

            <div className={styles.divider} />

            {/* ── Footer ───────────────────────────────────────────────────── */}
            <div className={styles.footer}>
                <a href="#" className={styles.viewAll}>
                    View full catalogue
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8H14M14 8L9 3M14 8L9 13"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </a>
                <span className={styles.count}>16 categories available</span>
            </div>

            {/* ── Hover modal (sliding image strip) ───────────────────────── */}
            <div ref={modalContainerRef} className={styles.modalContainer}>
                <div ref={modalSliderRef} className={styles.modalSlider}>
                    {PRODUCTS.map((p, i) => (
                        <div
                            key={i}
                            className={styles.modalSlide}
                            style={{ backgroundColor: p.accentColor }}
                        >
                            {/* Gradient overlay so image feels intentional */}
                            <div className={styles.modalOverlay} />
                            <Image
                                src={p.src}
                                alt={p.name}
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                            {/* Tag badge inside modal */}
                            <span
                                className={styles.modalTag}
                                style={{ '--tag-color': p.tagColor } as React.CSSProperties}
                            >
                {p.tag}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Custom cursor ────────────────────────────────────────────── */}
            <div ref={cursorRef}      className={styles.cursor} />
            <div ref={cursorLabelRef} className={styles.cursorLabel}>View</div>
        </section>
    );
}