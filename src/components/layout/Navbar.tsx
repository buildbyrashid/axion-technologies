"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Calculate scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalDocScrollLength = docHeight - winHeight;
      const progress = (currentScrollY / totalDocScrollLength) * 100;
      setScrollProgress(progress);

      // Determine visibility and scrolled state
      if (currentScrollY > 50) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1.5 pointer-events-none">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -120,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ transformOrigin: "top" }}
      >
        {/* Navbar Background Gradient Strip - Improves readability on light hero areas */}
        {!isScrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none h-32" />
        )}

        <div className="container-custom flex justify-center pt-8 pointer-events-auto">
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              layout: { duration: 0.4 }
            }}
            className={cn(
              "flex items-center justify-between w-full overflow-hidden transition-all duration-500",
              isScrolled
                ? "max-w-5xl bg-white/90 backdrop-blur-md shadow-xl rounded-full px-8 border border-white/40 py-2"
                : "max-w-7xl px-4 bg-transparent border-transparent py-6"
            )}
            style={{
              height: isScrolled ? "72px" : "112px"
            }}
          >
            {/* Logo */}
            <Link href="/" className="relative z-50 flex-shrink-0">
              <motion.div
                layout
                className={cn(
                  "relative transition-all duration-300 h-10 w-48 sm:h-14 sm:w-72"
                )}
              >
                <Image
                  src={isScrolled ? "/images/company/logo-light1.png" : "/images/company/logo-dark.png"}
                  alt="Axion Technology"
                  fill
                  className={cn(
                    "object-contain",
                    !isScrolled && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  )}
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-all hover:text-accent whitespace-nowrap",
                    isScrolled
                      ? "text-primary/70"
                      : "text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant={isScrolled ? "default" : "accent"}
                size="sm"
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  isScrolled ? "h-9 text-xs" : "h-11 shadow-lg"
                )}
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className={cn("h-6 w-6", isScrolled ? "text-primary" : "text-white")} />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-4 right-4 mt-2 bg-white/98 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden lg:hidden border border-white/20 pointer-events-auto"
            >
              <div className="flex flex-col space-y-4 p-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold text-primary hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="w-full rounded-full h-12">
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
