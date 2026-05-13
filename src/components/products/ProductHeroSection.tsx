"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

type SlideType = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
};

/* ================= DATA ================= */

const slides: SlideType[] = [
    {
        id: 1,
        title: "Where Visuals Come Alive",
        subtitle: "SIGMA SERIES",
        image:
            "../images/products/young-man-funny-expression.jpg",
    },
    {
        id: 2,
        title: "Immersive LED Experience",
        subtitle: "PREMIUM DISPLAY",
        image:
            "../images/products/digital-art-inmersive-exhibition.jpg",
    },
    {
        id: 3,
        title: "Future Ready Display Systems",
        subtitle: "AXION TECHNOLOGY",
        image:
            "../images/products/futurism-perspective-digital-nomads-lifestyle.jpg",
    },
];

/* ================= COMPONENT ================= */

const HeroSection: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [animKey, setAnimKey] = useState<number>(0);

    /* ================= AUTO SLIDE ================= */

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev: number) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );

            setAnimKey((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSlideChange = (index: number) => {
        setActiveSlide(index);
        setAnimKey((prev) => prev + 1);
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-white">

            {/* Background Glow */}
            <div className="absolute left-0 top-0 z-10 h-full w-full " />

            {/* MAIN CONTENT */}
            <div className="relative z-20 mx-auto flex h-full min-h-screen max-w-7xl flex-col items-center px-6 pt-16 pb-10 lg:flex-row lg:items-center lg:px-10 lg:py-0">

                {/* LEFT CONTENT */}
                <div className="relative z-10 w-full px-0 pt-4 sm:px-5 lg:w-1/2 lg:pt-0 order-2 lg:order-1">

                    <AnimatePresence mode="wait">
                        <motion.div key={animKey}>

                            {/* SUBTITLE */}
                            <motion.p
                                className="text-sm font-bold tracking-wide text-slate-700"
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.25, 0.1, 0.25, 1] as const,
                                }}
                            >
                                {slides[activeSlide].subtitle}
                            </motion.p>

                            {/* TITLE */}
                            <motion.h1
                                className="max-w-xl text-3xl font-extrabold uppercase leading-tight text-slate-800 sm:text-4xl md:text-[30px] lg:text-[40px]"
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.55,
                                    delay: 0.1,
                                    ease: [0.25, 0.1, 0.25, 1] as const,
                                }}
                            >
                                {slides[activeSlide].title}
                            </motion.h1>

                            {/* DESCRIPTION */}
                            <motion.p
                                className="mt-3 max-w-sm flex-wrap text-sm leading-6 text-slate-600"
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.55,
                                    delay: 0.2,
                                    ease: [0.25, 0.1, 0.25, 1] as const,
                                }}
                            >
                                Professional LED display systems designed for
                                enterprise, commercial branding, immersive visual
                                experiences, and modern installations.
                            </motion.p>

                            {/* BUTTONS */}
                            <motion.div
                                className="mt-8 flex flex-wrap gap-4 lg:mt-10 lg:gap-5 justify-center lg:justify-start"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1] as const,
                                }}
                            >
                                <button
                                    type="button"
                                    className="rounded-2xl bg-[#002B49] md:w-[200px] w-[150px] py-3 text-sm font-semibold text-white transition hover:scale-105 lg:px-10 lg:py-4"
                                >
                                    ABOUT US
                                </button>

                                <button
                                    type="button"
                                    className="rounded-2xl border border-slate-300 bg-white md:w-[200px] w-[150px] py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 lg:px-10 lg:py-4"
                                >
                                    CONTACT NOW
                                </button>
                            </motion.div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT IMAGE */}
                {/* Mobile: above text, fixed height. Desktop: absolute right column */}
                <div className="relative mt-8 h-64 w-full overflow-hidden sm:h-80 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-[40%] order-1 lg:order-2">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={activeSlide}
                            className="absolute inset-0"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            {/* GRID PIECES */}
                            <div className="grid h-full w-full grid-cols-4 grid-rows-4">

                                {Array.from({ length: 16 }).map((_, pieceIndex) => {

                                    const row = Math.floor(pieceIndex / 4);
                                    const col = pieceIndex % 4;

                                    /* 3 ANIMATION STYLES */
                                    const animationStyles = [

                                        /* STYLE 1 - SQUARE GRID */
                                        (pieceIndex: number) => ({
                                            initial: {
                                                opacity: 0,
                                                scale: 0,
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1,
                                            },
                                            transition: {
                                                duration: 0.5,
                                                delay: pieceIndex * 0.04,
                                                ease: [0.25, 0.1, 0.25, 1] as const,
                                            },
                                        }),

                                        /* STYLE 2 - PARALLEL / DIAGONAL */
                                        (
                                            pieceIndex: number,
                                            row: number,
                                            col: number
                                        ) => ({
                                            initial: {
                                                opacity: 0,
                                                x: col % 2 === 0 ? -120 : 120,
                                                y: row % 2 === 0 ? -40 : 40,
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0,
                                                y: 0,
                                            },
                                            transition: {
                                                duration: 0.7,
                                                delay: (row + col) * 0.08,
                                                ease: [0.25, 0.1, 0.25, 1] as const,
                                            },
                                        }),

                                        /* STYLE 3 - ROTATE REVEAL */
                                        (pieceIndex: number) => ({
                                            initial: {
                                                opacity: 0,
                                                rotate: 15,
                                                scale: 0.6,
                                            },
                                            animate: {
                                                opacity: 1,
                                                rotate: 0,
                                                scale: 1,
                                            },
                                            transition: {
                                                duration: 0.7,
                                                delay: pieceIndex * 0.05,
                                                ease: [0.25, 0.1, 0.25, 1] as const,
                                            },
                                        }),
                                    ];

                                    /* AUTO STYLE CHANGE */
                                    const currentStyle =
                                        animationStyles[
                                        activeSlide % animationStyles.length
                                        ];

                                    const selectedAnimation =
                                        currentStyle(pieceIndex, row, col);

                                    return (
                                        <motion.div
                                            key={pieceIndex}
                                            className="relative overflow-hidden"
                                            initial={selectedAnimation.initial}
                                            animate={selectedAnimation.animate}
                                            transition={selectedAnimation.transition}
                                        >
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${slides[activeSlide].image})`,
                                                    backgroundSize: "400% 400%",
                                                    backgroundPosition: `${col * 33.33}% ${row * 33.33}%`,
                                                }}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Overlay — fades left on desktop, fades top on mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent lg:bg-gradient-to-r" />

                        </motion.div>

                    </AnimatePresence>
                </div>

                {/* VERTICAL SLIDER DOTS */}
                {/* Desktop: left-center absolute. Mobile: bottom-center row */}
                <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-row gap-4 lg:left-4 lg:top-1/2 lg:bottom-auto lg:flex-col lg:-translate-x-0 lg:-translate-y-1/2 lg:gap-5">

                    {slides.map((_: SlideType, index: number) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSlideChange(index)}
                            className={`rounded-full border-2 border-[#002B49] transition-all duration-300 ${activeSlide === index
                                    ? "h-2 w-2 bg-[#002B49]"
                                    : "h-2 w-2 bg-transparent"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;