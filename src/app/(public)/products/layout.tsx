import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description:
        "Explore Axion Technology's complete range of professional visual solutions — LED display systems, LCD & interactive kiosks, lighting, power distribution, and stage systems engineered for global deployments.",
    keywords: [
        "LED display",
        "indoor rental LED",
        "outdoor LED wall",
        "fine pitch LED",
        "COB MIP",
        "commercial displays",
        "touch kiosks",
        "interactive flat panels",
        "digital signage",
        "professional lighting",
        "stage systems",
        "power distribution",
    ],
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
