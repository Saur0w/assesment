import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Usha Info Tech, our mission, vision, and commitment to delivering modern IT solutions.",
    openGraph: {
        title: "Services",
        description:
            "Discover the story behind Usha Info Tech and our expertise in scalable and secure technology solutions.",
        url: "https://your-domain.com/about",
        siteName: "Usha Info Tech",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
