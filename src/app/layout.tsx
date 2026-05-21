import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from 'sonner';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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
    <html lang="en" className={`${plusJakartaSans.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors toastOptions={{
          style: {
            borderRadius: '1.25rem',
            padding: '16px 20px',
            fontFamily: 'var(--font-plus-jakarta), sans-serif',
          }
        }} />
      </body>
    </html>
  );
}

