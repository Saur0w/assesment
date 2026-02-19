'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'all' | 'gaming-laptop' | 'laptop' | 'gaming-pc' | 'monitor' | 'cctv';

interface Product {
    id: string;
    category: Category;
    name: string;
    brand: string;
    price: string;
    originalPrice?: string;
    tag?: string;
    tagColor?: string;
    specs: string[];
    icon: React.ReactNode;
    accentColor: string;
    isNew?: boolean;
    isBestSeller?: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const Icons = {
    GamingLaptop: () => (
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="72" height="44" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="10" y="10" width="60" height="32" rx="2" fill="currentColor" fillOpacity="0.08"/>
            <path d="M28 52 L52 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 48 L76 48" stroke="currentColor" strokeWidth="2"/>
            {/* crosshair */}
            <circle cx="40" cy="26" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6"/>
            <path d="M40 18 V22 M40 30 V34 M32 26 H36 M44 26 H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
            {/* RGB stripe */}
            <rect x="10" y="44" width="60" height="2" rx="1" fill="url(#rgb)" fillOpacity="0.7"/>
            <defs>
                <linearGradient id="rgb" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f00"/>
                    <stop offset="0.33" stopColor="#0f0"/>
                    <stop offset="0.66" stopColor="#00f"/>
                    <stop offset="1" stopColor="#f00"/>
                </linearGradient>
            </defs>
        </svg>
    ),
    Laptop: () => (
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="6" width="64" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="12" width="52" height="28" rx="2" fill="currentColor" fillOpacity="0.08"/>
            <path d="M24 50 L56 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 46 L78 46" stroke="currentColor" strokeWidth="2"/>
            {/* screen content lines */}
            <rect x="20" y="18" width="20" height="2" rx="1" fill="currentColor" fillOpacity="0.4"/>
            <rect x="20" y="23" width="30" height="2" rx="1" fill="currentColor" fillOpacity="0.25"/>
            <rect x="20" y="28" width="24" height="2" rx="1" fill="currentColor" fillOpacity="0.25"/>
        </svg>
    ),
    GamingPC: () => (
        <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="4" width="44" height="68" rx="6" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="10" width="32" height="20" rx="3" fill="currentColor" fillOpacity="0.12"/>
            {/* fan */}
            <circle cx="30" cy="45" r="12" stroke="currentColor" strokeWidth="1.5" fillOpacity="0"/>
            <circle cx="30" cy="45" r="3" fill="currentColor" fillOpacity="0.5"/>
            <path d="M30 33 C32 37 34 41 30 45 C28 41 26 37 30 33Z" fill="currentColor" fillOpacity="0.35"/>
            <path d="M42 45 C38 47 34 49 30 45 C34 43 38 41 42 45Z" fill="currentColor" fillOpacity="0.35"/>
            <path d="M30 57 C28 53 26 49 30 45 C32 49 34 53 30 57Z" fill="currentColor" fillOpacity="0.35"/>
            <path d="M18 45 C22 43 26 41 30 45 C26 47 22 49 18 45Z" fill="currentColor" fillOpacity="0.35"/>
            {/* ports */}
            <rect x="18" y="64" width="5" height="3" rx="1" fill="currentColor" fillOpacity="0.5"/>
            <rect x="26" y="64" width="5" height="3" rx="1" fill="currentColor" fillOpacity="0.5"/>
            {/* RGB */}
            <rect x="14" y="14" width="4" height="12" rx="2" fill="url(#rgb2)" fillOpacity="0.9"/>
            <defs>
                <linearGradient id="rgb2" x1="0" y1="0" x2="0" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f00"/>
                    <stop offset="0.5" stopColor="#0f0"/>
                    <stop offset="1" stopColor="#00f"/>
                </linearGradient>
            </defs>
        </svg>
    ),
    Monitor: () => (
        <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="72" height="48" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="10" y="10" width="60" height="36" rx="2" fill="currentColor" fillOpacity="0.08"/>
            <path d="M32 52 L30 62 L50 62 L48 52" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M24 62 L56 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* screen reflection */}
            <path d="M14 14 L26 14 L20 28Z" fill="currentColor" fillOpacity="0.07"/>
            {/* status dot */}
            <circle cx="40" cy="5" r="1.5" fill="currentColor" fillOpacity="0.5"/>
        </svg>
    ),
    CCTV: () => (
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* camera body */}
            <rect x="20" y="18" width="38" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none" fillOpacity="0.08"/>
            {/* lens */}
            <circle cx="46" cy="30" r="9" stroke="currentColor" strokeWidth="2"/>
            <circle cx="46" cy="30" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="46" cy="30" r="2" fill="currentColor" fillOpacity="0.5"/>
            {/* mount arm */}
            <path d="M30 18 L30 8 L50 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="50" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
            {/* IR LEDs */}
            <circle cx="26" cy="24" r="2" fill="currentColor" fillOpacity="0.4"/>
            <circle cx="26" cy="30" r="2" fill="currentColor" fillOpacity="0.4"/>
            <circle cx="26" cy="36" r="2" fill="currentColor" fillOpacity="0.4"/>
            {/* status */}
            <circle cx="60" cy="22" r="3" fill="#ff3b3b" fillOpacity="0.8"/>
        </svg>
    ),
};

// ─── Product Data ─────────────────────────────────────────────────────────────

const products: Product[] = [
    // Gaming Laptops
    {
        id: 'gl-01', category: 'gaming-laptop',
        brand: 'ASUS ROG', name: 'Strix G16 (2024)',
        price: '₹1,49,990', originalPrice: '₹1,69,990',
        tag: 'RTX 4070', tagColor: '#22c678',
        specs: ['Intel i9-14900HX', '32 GB DDR5', '1 TB NVMe', '16" QHD 240Hz'],
        icon: <Icons.GamingLaptop />, accentColor: '#22c678',
        isBestSeller: true,
    },
    {
        id: 'gl-02', category: 'gaming-laptop',
        brand: 'MSI', name: 'Raider GE78 HX',
        price: '₹1,89,990',
        tag: 'RTX 4080', tagColor: '#ff4d4d',
        specs: ['Intel i9-14900HX', '64 GB DDR5', '2 TB NVMe', '17" QHD+ 240Hz'],
        icon: <Icons.GamingLaptop />, accentColor: '#ff4d4d',
        isNew: true,
    },
    {
        id: 'gl-03', category: 'gaming-laptop',
        brand: 'Lenovo LOQ', name: 'LOQ 15IAX9I',
        price: '₹79,990', originalPrice: '₹89,990',
        tag: 'RTX 3050', tagColor: '#2a8abf',
        specs: ['Intel i5-12450HX', '16 GB DDR5', '512 GB NVMe', '15.6" FHD 144Hz'],
        icon: <Icons.GamingLaptop />, accentColor: '#2a8abf',
    },
    {
        id: 'gl-04', category: 'gaming-laptop',
        brand: 'HP OMEN', name: 'Transcend 16',
        price: '₹1,29,990',
        tag: 'RTX 4060', tagColor: '#c6a022',
        specs: ['AMD Ryzen 9 8945HX', '32 GB DDR5', '1 TB NVMe', '16" 2.5K 165Hz'],
        icon: <Icons.GamingLaptop />, accentColor: '#c6a022',
        isNew: true,
    },

    // Laptops
    {
        id: 'l-01', category: 'laptop',
        brand: 'Dell', name: 'XPS 15 (9530)',
        price: '₹1,49,990', originalPrice: '₹1,69,990',
        tag: 'OLED', tagColor: '#2ab98d',
        specs: ['Intel i7-13700H', '32 GB DDR5', '1 TB NVMe', '15.6" OLED Touch'],
        icon: <Icons.Laptop />, accentColor: '#2ab98d',
        isBestSeller: true,
    },
    {
        id: 'l-02', category: 'laptop',
        brand: 'HP', name: 'Spectre x360 14',
        price: '₹1,29,990',
        tag: '2-in-1', tagColor: '#2a8abf',
        specs: ['Intel Core Ultra 7', '16 GB LPDDR5X', '1 TB NVMe', '14" 2.8K OLED'],
        icon: <Icons.Laptop />, accentColor: '#2a8abf',
        isNew: true,
    },
    {
        id: 'l-03', category: 'laptop',
        brand: 'Lenovo', name: 'ThinkPad X1 Carbon',
        price: '₹1,19,990',
        tag: 'Business', tagColor: '#9b6dff',
        specs: ['Intel i7-1365U', '32 GB DDR5', '1 TB NVMe', '14" IPS Anti-glare'],
        icon: <Icons.Laptop />, accentColor: '#9b6dff',
    },
    {
        id: 'l-04', category: 'laptop',
        brand: 'Asus', name: 'Zenbook 14 OLED',
        price: '₹84,990', originalPrice: '₹94,990',
        specs: ['AMD Ryzen 7 8700U', '32 GB LPDDR5X', '1 TB NVMe', '14" 2.8K OLED 120Hz'],
        icon: <Icons.Laptop />, accentColor: '#22c678',
    },

    // Gaming PCs
    {
        id: 'pc-01', category: 'gaming-pc',
        brand: 'Custom Build', name: 'Destroyer X Pro',
        price: '₹1,89,990',
        tag: 'RTX 4090', tagColor: '#ff4d4d',
        specs: ['Intel i9-14900K', '64 GB DDR5 6000MHz', '2 TB NVMe + 4 TB HDD', 'Full Tower ATX'],
        icon: <Icons.GamingPC />, accentColor: '#ff4d4d',
        isNew: true,
    },
    {
        id: 'pc-02', category: 'gaming-pc',
        brand: 'Custom Build', name: 'Ryzen Beast 7900X',
        price: '₹1,24,990',
        tag: 'RTX 4070 Ti', tagColor: '#22c678',
        specs: ['AMD Ryzen 9 7900X', '32 GB DDR5 5600MHz', '1 TB NVMe Gen4', 'Mid Tower ATX'],
        icon: <Icons.GamingPC />, accentColor: '#22c678',
        isBestSeller: true,
    },
    {
        id: 'pc-03', category: 'gaming-pc',
        brand: 'Custom Build', name: 'Budget Champion',
        price: '₹64,990', originalPrice: '₹74,990',
        tag: 'RX 7600', tagColor: '#c6a022',
        specs: ['AMD Ryzen 5 7600X', '16 GB DDR5', '512 GB NVMe', 'Micro-ATX'],
        icon: <Icons.GamingPC />, accentColor: '#c6a022',
    },

    // Monitors
    {
        id: 'm-01', category: 'monitor',
        brand: 'LG', name: 'UltraGear 27GP950',
        price: '₹54,990', originalPrice: '₹64,990',
        tag: '4K 160Hz', tagColor: '#22c678',
        specs: ['27" 4K UHD', 'IPS Nano 160Hz', '1ms GtG', 'HDMI 2.1 + DP 1.4'],
        icon: <Icons.Monitor />, accentColor: '#22c678',
        isBestSeller: true,
    },
    {
        id: 'm-02', category: 'monitor',
        brand: 'Samsung', name: 'Odyssey G9 Neo',
        price: '₹1,09,990',
        tag: 'Curved QLED', tagColor: '#2a8abf',
        specs: ['49" Super Ultrawide', '5120×1440 240Hz', '1ms GtG', 'Mini LED Quantum'],
        icon: <Icons.Monitor />, accentColor: '#2a8abf',
        isNew: true,
    },
    {
        id: 'm-03', category: 'monitor',
        brand: 'ASUS', name: 'ProArt PA279CRV',
        price: '₹74,990',
        tag: '4K USB-C', tagColor: '#9b6dff',
        specs: ['27" 4K IPS', '99% Adobe RGB', '60Hz', '96W USB-C PD'],
        icon: <Icons.Monitor />, accentColor: '#9b6dff',
    },

    // CCTV
    {
        id: 'cc-01', category: 'cctv',
        brand: 'Hikvision', name: 'AcuSense 4MP',
        price: '₹4,290',
        tag: 'AI Detect', tagColor: '#ff4d4d',
        specs: ['4MP 2560×1440', 'ColorVu Night Vision', 'H.265+ Compression', 'Smart Motion Alert'],
        icon: <Icons.CCTV />, accentColor: '#ff4d4d',
        isBestSeller: true,
    },
    {
        id: 'cc-02', category: 'cctv',
        brand: 'Dahua', name: 'WizSense 8MP 4K',
        price: '₹7,990', originalPrice: '₹9,490',
        tag: '4K', tagColor: '#22c678',
        specs: ['8MP 4K UHD', 'Full-colour Night', 'AI Perimeter Protection', 'IP67 + IK10'],
        icon: <Icons.CCTV />, accentColor: '#22c678',
        isNew: true,
    },
    {
        id: 'cc-03', category: 'cctv',
        brand: 'CP Plus', name: 'Indus Dome 2MP',
        price: '₹2,190',
        specs: ['2MP 1080p', 'IR Night 30m', 'H.265 Compression', 'Vandal-Proof Dome'],
        icon: <Icons.CCTV />, accentColor: '#2ab98d',
    },
];

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const tabs: { id: Category; label: string; emoji: string }[] = [
    { id: 'all',           label: 'All Products',    emoji: '⊞' },
    { id: 'gaming-laptop', label: 'Gaming Laptops',  emoji: '◈' },
    { id: 'laptop',        label: 'Laptops',          emoji: '◫' },
    { id: 'gaming-pc',     label: 'Gaming PCs',       emoji: '⬡' },
    { id: 'monitor',       label: 'Monitors',         emoji: '◻' },
    { id: 'cctv',          label: 'CCTV',             emoji: '◎' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductCatalog() {
    const sectionRef    = useRef<HTMLElement>(null);
    const gridRef       = useRef<HTMLDivElement>(null);
    const tabsRef       = useRef<HTMLDivElement>(null);
    const pillRef       = useRef<HTMLDivElement>(null);
    const activeTabRef  = useRef<HTMLButtonElement | null>(null);

    const [active, setActive]           = useState<Category>('all');
    const [isAnimating, setIsAnimating] = useState(false);

    // ── Section entrance
    useGSAP(() => {
        gsap.from(`.${styles.heading}`, {
            opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        });
        gsap.from(`.${styles.tabs}`, {
            opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        });

        // Initial card entrance
        gsap.from(`.${styles.card}`, {
            opacity: 0, y: 60, scale: 0.95,
            duration: 0.7, ease: 'power3.out',
            stagger: { amount: 0.5, from: 'start' },
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        });
    }, { scope: sectionRef });

    // ── Pill sliding to active tab
    const movePill = useCallback((tabEl: HTMLButtonElement) => {
        const pill = pillRef.current;
        const bar  = tabsRef.current;
        if (!pill || !bar) return;

        const tabRect = tabEl.getBoundingClientRect();
        const barRect = bar.getBoundingClientRect();

        gsap.to(pill, {
            x: tabRect.left - barRect.left,
            width: tabRect.width,
            duration: 0.45,
            ease: 'power3.inOut',
        });
    }, []);

    const handleFilter = useCallback(
        (cat: Category, tabEl: HTMLButtonElement) => {
            if (cat === active || isAnimating) return;
            setIsAnimating(true);

            movePill(tabEl);
            activeTabRef.current = tabEl;

            const grid     = gridRef.current;
            if (!grid) return;

            const allCards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`, grid);
            const outCards = allCards.filter(
                (c) => cat !== 'all' && c.dataset.category !== cat
            );
            const inCards  = allCards.filter(
                (c) => cat === 'all' || c.dataset.category === cat
            );

            const tl = gsap.timeline({
                onComplete: () => setIsAnimating(false),
            });

            if (outCards.length) {
                tl.to(outCards, {
                    opacity: 0,
                    scale: 0.88,
                    y: -20,
                    duration: 0.3,
                    ease: 'power2.in',
                    stagger: 0.03,
                    onComplete: () => {
                        outCards.forEach((c) => {
                            c.style.display  = 'none';
                            c.style.opacity  = '0';
                            c.style.transform = '';
                        });
                    },
                });
            }

            tl.add(() => {
                setActive(cat);
                inCards.forEach((c) => {
                    c.style.display  = '';
                    c.style.opacity  = '0';
                    c.style.transform = 'translateY(40px) scale(0.94)';
                });
            }, outCards.length ? '-=0.05' : 0);

            tl.to(inCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.055,
            }, '<0.05');
        },
        [active, isAnimating, movePill]
    );

    const filtered = active === 'all'
        ? products
        : products.filter((p) => p.category === active);

    const count = active === 'all' ? products.length : filtered.length;

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.heading}>
                <div className={styles.headingLeft}>
                    <span className={styles.eyebrow}>Our Catalogue</span>
                    <h2 className={styles.title}>
                        Shop by<br /><em>category.</em>
                    </h2>
                </div>
                <p className={styles.subtitle}>
                    Gaming laptops, workstations, monitors, and surveillance — all in one place,
                    all genuine, all backed by our expert support.
                </p>
            </div>

            <div className={styles.tabsWrapper}>
                <div ref={tabsRef} className={styles.tabs}>
                    <div ref={pillRef} className={styles.tabPill} />

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
                            onClick={(e) => handleFilter(tab.id, e.currentTarget)}
                            ref={(el) => {
                                if (el && tab.id === 'all' && !activeTabRef.current) {
                                    activeTabRef.current = el;
                                    requestAnimationFrame(() => movePill(el));
                                }
                            }}
                        >
                            <span className={styles.tabEmoji}>{tab.emoji}</span>
                            <span className={styles.tabLabel}>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <span className={styles.productCount}>
          {count} product{count !== 1 ? 's' : ''}
        </span>
            </div>

            <div ref={gridRef} className={styles.grid}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        data-category={product.category}
                        className={styles.card}
                        style={{
                            '--accent': product.accentColor,
                            display: active === 'all' || product.category === active ? '' : 'none',
                        } as React.CSSProperties}
                    >
                        <div className={styles.cardBadges}>
                            {product.isNew && (
                                <span className={styles.badgeNew}>New</span>
                            )}
                            {product.isBestSeller && (
                                <span className={styles.badgeBest}>Best Seller</span>
                            )}
                        </div>

                        <div className={styles.cardVisual}>
                            <div className={styles.cardIconWrap}>
                                {product.icon}
                            </div>
                            {product.tag && (
                                <span
                                    className={styles.cardTag}
                                    style={{ '--tag-color': product.tagColor } as React.CSSProperties}
                                >
                  {product.tag}
                </span>
                            )}
                        </div>

                        <div className={styles.cardInfo}>
                            <span className={styles.cardBrand}>{product.brand}</span>
                            <h3 className={styles.cardName}>{product.name}</h3>

                            <ul className={styles.cardSpecs}>
                                {product.specs.map((s) => (
                                    <li key={s}>{s}</li>
                                ))}
                            </ul>

                            <div className={styles.cardFooter}>
                                <div className={styles.cardPricing}>
                                    <span className={styles.cardPrice}>{product.price}</span>
                                    {product.originalPrice && (
                                        <span className={styles.cardOriginal}>{product.originalPrice}</span>
                                    )}
                                </div>
                                <button className={styles.cardBtn}>
                                    Enquire
                                </button>
                            </div>
                        </div>

                        <div className={styles.cardGlow} />
                    </div>
                ))}
            </div>
        </section>
    );
}