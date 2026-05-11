import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Axion Technology | Engineering Advanced Visual Solutions",
    template: "%s | Axion Technology",
  },
  description:
    "Axion Technology Co Ltd — global visual technology engineering company specializing in professional LED display systems, interactive technologies, stage systems, lighting, audio, and integrated AV infrastructure.",
  keywords: [
    "LED display systems",
    "AV solutions",
    "visual technology",
    "interactive kiosks",
    "professional audio",
    "lighting systems",
    "Middle East AV",
    "Hong Kong AV",
  ],
  metadataBase: new URL("https://www.axiontechnology.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
