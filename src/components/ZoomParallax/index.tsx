"use client";

import { JSX, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface Picture {
    src: string;           // now a string URL
    targetScale: number;
    className?: string;
}

export default function Index(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const pictures: Picture[] = [
        { src: '/images/1.jpg', targetScale: 4 },
        { src: '/images/2.jpg', targetScale: 5 },
        { src: '/images/3.jpg', targetScale: 6 },
        { src: '/images/4.jpg', targetScale: 5 },
        { src: '/images/5.jpg', targetScale: 6 },
        { src: '/images/6.jpg', targetScale: 8 },
        { src: '/images/7.jpg', targetScale: 9 },
    ];

    useGSAP(
        () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            container.style.height = `${window.innerHeight * 3}px`;

            pictures.forEach((picture, index) => {
                const imageElement = imageRefs.current[index];
                if (!imageElement) return;

                gsap.set(imageElement, { scale: 1 });
                gsap.to(imageElement, {
                    scale: picture.targetScale,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                        markers: false,
                    },
                });
            });

            const handleResize = () => {
                if (containerRef.current) {
                    containerRef.current.style.height = `${window.innerHeight * 3}px`;
                    ScrollTrigger.refresh();
                }
            };

            let resizeTimeout: NodeJS.Timeout;
            const debouncedResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 150);
            };

            window.addEventListener('resize', debouncedResize);
            return () => {
                window.removeEventListener('resize', debouncedResize);
                clearTimeout(resizeTimeout);
            };
        },
        { scope: containerRef }
    );

    return (
        <>
            <div ref={containerRef} className={styles.container}>
                <div className={styles.sticky}>
                    {pictures.map(({ src }, index) => (
                        <div
                            key={index}
                            ref={(el) => { imageRefs.current[index] = el; }}
                            className={styles.el}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={src}
                                    fill
                                    alt={`image-${index + 1}`}
                                    priority={index < 2}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.filler}></div>
        </>
    );
}