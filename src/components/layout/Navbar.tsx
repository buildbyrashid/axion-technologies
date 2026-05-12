"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

function MagneticLink({ children, href, isActive }: { children: React.ReactNode; href: string; isActive: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative"
    >
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "px-6 py-2 text-sm font-bold transition-colors duration-300 font-sora tracking-wide relative block",
          isActive ? "text-accent" : "text-white/90 hover:text-white"
        )}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
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
        className="fixed top-0 left-0 right-0 z-50 pt-6 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "flex items-center justify-between w-full transition-all duration-500 rounded-full px-8 py-4 backdrop-blur-md border border-white/10",
            isScrolled ? "bg-black/20 shadow-2xl" : "bg-transparent"
          )}>
            {/* Logo */}
            <Link href="/" className="relative z-50 flex-shrink-0">
              <motion.div className="h-10 w-40 sm:w-56 relative">
                <Image
                  src="/images/company/logo-dark.png"
                  alt="Axion Technology"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <MagneticLink 
                  key={link.name} 
                  href={link.href}
                  isActive={pathname === link.href}
                >
                  {link.name}
                </MagneticLink>
              ))}
              <div className="pl-4">
                <Button
                  className="rounded-full bg-accent text-white hover:bg-white hover:text-accent transition-all duration-300 px-6 font-bold shadow-[0_0_15px_rgba(13,149,240,0.3)] border border-transparent hover:border-accent"
                >
                  Get a Quote
                </Button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-50 p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all duration-300",
                        isActive 
                          ? "bg-accent/5 text-accent" 
                          : "text-primary hover:bg-slate-50 hover:text-accent"
                      )}
                    >
                      {link.name}
                      <ChevronRight className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      )} />
                    </Link>
                  );
                })}
                <div className="pt-4">
                  <Button className="w-full rounded-full h-14 bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 text-lg font-bold">
                    Get a Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
