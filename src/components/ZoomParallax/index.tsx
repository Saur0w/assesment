"use client";

import {JSX, useRef} from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './style.module.scss';

import Picture1 from '../../../public/images/1.jpg';
import Picture2 from '../../../public/images/2.jpg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg';
import Picture5 from '../../../public/images/5.jpg';
import Picture6 from '../../../public/images/6.jpg';
import Picture7 from '../../../public/images/7.jpg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Picture {
    src: StaticImageData;
    targetScale: number;
    className?: string;
}

export default function Index(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const pictures: Picture[] = [
        { src: Picture1, targetScale: 4 },
        { src: Picture2, targetScale: 5 },
        { src: Picture3, targetScale: 6 },
        { src: Picture4, targetScale: 5 },
        { src: Picture5, targetScale: 6 },
        { src: Picture6, targetScale: 8 },
        { src: Picture7, targetScale: 9 },
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
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                            className={styles.el}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={src}
                                    fill
                                    alt={`image-${index + 1}`}
                                    placeholder="blur"
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