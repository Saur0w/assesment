"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing/index";
import Lenis from "lenis";
import { useEffect } from "react";
import Des from "@/components/Des";
import Zoom from "@/components/ZoomParallax/index";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
  return (
    <div className={styles.page}>
        <Landing />
        <Des />
        <Zoom />
    </div>
  );
}
