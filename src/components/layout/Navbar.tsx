"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ProductDropdown, { productCategories } from "./ProductDropdown";
import QuoteModal from "@/components/modals/QuoteModal";

/* ─────────────────────────── data ─────────────────────────── */
const navLinks = [
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Solutions", href: "/solutions", hasDropdown: false },
  { name: "Industries", href: "/industries", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

/* ─────────────────────────── TopBar ────────────────────────── */
function TopBar() {
  return (
    <div className="bg-[#021752] text-white py-2 px-6 sm:px-12 lg:px-20 hidden md:block">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center text-[13px] font-medium">
        <div className="flex items-center space-x-6">
          <a href="mailto:sales@axiontechnology.com" className="flex items-center hover:text-accent transition-colors">
            <Mail className="h-3.5 w-3.5 mr-2 text-accent" />
            Email: sales@axiontechnology.com
          </a>
          <a href="https://wa.me/85223456789" className="flex items-center hover:text-accent transition-colors">
            <FaWhatsapp className="h-3.5 w-3.5 mr-2 text-accent" />
            Whatsapp: +852 2345 6789
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <FaFacebookF className="h-3.5 w-3.5 hover:text-accent cursor-pointer transition-colors" />
            <FaTwitter className="h-3.5 w-3.5 hover:text-accent cursor-pointer transition-colors" />
            <FaLinkedinIn className="h-3.5 w-3.5 hover:text-accent cursor-pointer transition-colors" />
            <FaInstagram className="h-3.5 w-3.5 hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Desktop NavLink ───────────────── */
function NavLink({ link, isScrolled, pathname }: { link: typeof navLinks[0]; isScrolled: boolean; pathname: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = pathname === link.href;

  return (
    <div
      className="relative group px-4 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={link.href}
        className={cn(
          "flex items-center text-[14px] font-bold tracking-wide transition-colors font-sora",
          isScrolled
            ? isActive ? "text-accent" : "text-slate-700 hover:text-accent"
            : isActive ? "text-accent" : "text-white hover:text-accent"
        )}
      >
        {link.name}
        {link.hasDropdown && (
          <ChevronDown className={cn("h-3.5 w-3.5 ml-1 opacity-50 transition-transform duration-300", isHovered && "rotate-180")} />
        )}
      </Link>
      <AnimatePresence>
        {isHovered && link.name === "Products" && (
          <ProductDropdown onClose={() => setIsHovered(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── types ─────────────────────────── */
type MobileScreen =
  | { screen: "main" }
  | { screen: "categories" }
  | { screen: "subcategories"; catId: number }
  | { screen: "products"; catId: number; subId: number };

/* slide variants – every "page" slides in from right, out to left */
const slideVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

/* back-slide variants for "Back" navigation */
const backSlideVariants = {
  enter: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

/* ─────────────────────────── Navbar ────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>({ screen: "main" });
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  /* track scroll */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 100) {
        setIsScrolled(true);
        setIsVisible(isMobileMenuOpen ? true : y <= lastScrollY);
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  /* reset inner screen when drawer closes */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => setMobileScreen({ screen: "main" }), 350);
  };

  /* helpers */
  const goForward = (screen: MobileScreen) => {
    setDirection("forward");
    setMobileScreen(screen);
  };
  const goBack = (screen: MobileScreen) => {
    setDirection("back");
    setMobileScreen(screen);
  };

  const activeVariants = direction === "forward" ? slideVariants : backSlideVariants;

  /* ── breadcrumb title ── */
  const getTitle = () => {
    if (mobileScreen.screen === "main") return null;
    if (mobileScreen.screen === "categories") return "Products";
    if (mobileScreen.screen === "subcategories") return productCategories[mobileScreen.catId].name;
    if (mobileScreen.screen === "products")
      return productCategories[mobileScreen.catId].subcategories[mobileScreen.subId].name;
    return "";
  };

  /* ── back action ── */
  const handleBack = () => {
    if (mobileScreen.screen === "categories") goBack({ screen: "main" });
    else if (mobileScreen.screen === "subcategories") goBack({ screen: "categories" });
    else if (mobileScreen.screen === "products") goBack({ screen: "subcategories", catId: mobileScreen.catId });
  };

  const title = getTitle();

  return (
    <>
      {/* ═══════════════ FIXED NAV BAR ═══════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50" suppressHydrationWarning>
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: "auto", opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <TopBar />
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          className={cn(
            "w-full transition-all duration-300 border-b",
            isScrolled
              ? "bg-white py-3 border-slate-200 shadow-md"
              : "bg-black/20 backdrop-blur-md py-5 border-white/10"
          )}
        >
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-10 w-40 sm:h-12 sm:w-56">
                <Image
                  src={isScrolled ? "/images/company/logo-light1.png" : "/images/company/logo-dark.png"}
                  alt="Axion Technology"
                  fill
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-contain transition-all duration-500"
                  priority
                />
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.name} link={link} isScrolled={isScrolled} pathname={pathname} />
              ))}
              <div className="pl-6 flex items-center space-x-4">
                <div className={cn("h-8 w-px bg-slate-200 hidden xl:block", !isScrolled && "bg-white/20")} />
                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className={cn(
                    "rounded-none px-8 py-6 font-bold text-[14px] transition-all",
                    isScrolled
                      ? "bg-accent text-white hover:bg-[#021752]"
                      : "bg-white text-primary hover:bg-accent hover:text-white"
                  )}
                >
                  Get a Quote Now
                </Button>
              </div>
            </div>

            {/* Hamburger */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-none transition-colors",
                isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Drawer shell */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.32, 0, 0.16, 1], duration: 0.32 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] z-[70] lg:hidden flex flex-col overflow-hidden"
              style={{ background: "#00153D" }}
            >
              {/* ── Drawer Header ── */}
              <div
                className="flex items-center justify-between px-5 flex-shrink-0 border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)", minHeight: 64 }}
              >
                {/* Back or Logo */}
                {title !== null ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                    <span className="text-[12px] font-semibold tracking-widest uppercase text-white/50">Back</span>
                  </button>
                ) : (
                  <div className="relative h-8 w-36">
                    <Image
                      src="/images/company/logo-dark.png"
                      alt="Axion Technology"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}

                {/* Screen title */}
                {title && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 text-[13px] font-bold tracking-widest uppercase truncate max-w-[45%] text-center"
                    style={{ color: "#0A84E8", fontFamily: "'Sora', sans-serif" }}
                  >
                    {title}
                  </span>
                )}

                {/* Close */}
                <button
                  onClick={closeMobileMenu}
                  className="text-white/40 hover:text-white transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ── Slide Screens ── */}
              <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={mobileScreen.screen + ("catId" in mobileScreen ? mobileScreen.catId : "") + ("subId" in mobileScreen ? mobileScreen.subId : "")}
                    variants={activeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", ease: [0.32, 0, 0.16, 1], duration: 0.28 }}
                    className="absolute inset-0 overflow-y-auto"
                  >

                    {/* ════ SCREEN 1: Main Menu ════ */}
                    {mobileScreen.screen === "main" && (
                      <div className="py-4">
                        {/* Section label */}
                        <div
                          className="px-6 pt-2 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          Navigation
                        </div>

                        {navLinks.map((link, i) => (
                          link.hasDropdown ? (
                            /* Products → slide forward */
                            <button
                              key={link.name}
                              onClick={() => goForward({ screen: "categories" })}
                              className="w-full flex items-center justify-between group transition-all"
                              style={{ minHeight: 56, paddingLeft: 24, paddingRight: 24 }}
                            >
                              <span
                                className="text-[15px] font-bold tracking-wide"
                                style={{ fontFamily: "'Sora', sans-serif", color: "#ffffff" }}
                              >
                                {link.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "#0A84E8" }}>
                                  Explore
                                </span>
                                <ChevronRight
                                  size={14}
                                  strokeWidth={2.5}
                                  style={{ color: "#0A84E8" }}
                                  className="group-hover:translate-x-0.5 transition-transform"
                                />
                              </div>
                            </button>
                          ) : (
                            /* Regular link */
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between group transition-all"
                              style={{ minHeight: 56, paddingLeft: 24, paddingRight: 24 }}
                            >
                              <span
                                className="text-[15px] font-bold tracking-wide"
                                style={{
                                  fontFamily: "'Sora', sans-serif",
                                  color: pathname === link.href ? "#0A84E8" : "#ffffff",
                                }}
                              >
                                {link.name}
                              </span>
                              {pathname === link.href && (
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0A84E8" }} />
                              )}
                            </Link>
                          )
                        )).reduce<React.ReactNode[]>((acc, el, i) => {
                          if (i > 0) acc.push(
                            <div key={`div-${i}`} style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: 24 }} />
                          );
                          acc.push(el);
                          return acc;
                        }, [])}

                        {/* CTA */}
                        <div className="px-6 pt-8 pb-4">
                          <button
                            onClick={() => { setIsQuoteModalOpen(true); closeMobileMenu(); }}
                            className="w-full flex items-center justify-center font-bold text-[14px] tracking-wide text-white transition-all active:scale-[0.98]"
                            style={{
                              height: 52,
                              background: "#0A84E8",
                              fontFamily: "'Sora', sans-serif",
                              letterSpacing: "0.06em",
                            }}
                          >
                            GET A QUOTE NOW
                          </button>
                        </div>

                        {/* Contact strip */}
                        <div
                          className="px-6 py-4 space-y-2 border-t"
                          style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                          <a href="mailto:sales@axiontechnology.com" className="flex items-center gap-3 text-[12px] text-white/40 hover:text-white/70 transition-colors">
                            <Mail size={13} />
                            sales@axiontechnology.com
                          </a>
                          <a href="https://wa.me/85223456789" className="flex items-center gap-3 text-[12px] text-white/40 hover:text-white/70 transition-colors">
                            <FaWhatsapp size={13} />
                            +852 2345 6789
                          </a>
                        </div>
                      </div>
                    )}

                    {/* ════ SCREEN 2: Categories ════ */}
                    {mobileScreen.screen === "categories" && (
                      <div className="py-4">
                        <div
                          className="px-6 pt-2 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          Product Categories
                        </div>

                        {productCategories.map((cat, idx) => (
                          <div key={cat.name}>
                            <button
                              onClick={() => goForward({ screen: "subcategories", catId: idx })}
                              className="w-full flex items-center justify-between group transition-colors"
                              style={{ minHeight: 56, paddingLeft: 24, paddingRight: 24 }}
                            >
                              <span
                                className="text-[14px] font-semibold tracking-wide text-left leading-snug"
                                style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.9)" }}
                              >
                                {cat.name}
                              </span>
                              <ChevronRight
                                size={15}
                                strokeWidth={2.5}
                                className="flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              />
                            </button>
                            {idx < productCategories.length - 1 && (
                              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: 24 }} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ════ SCREEN 3: Subcategories ════ */}
                    {mobileScreen.screen === "subcategories" && (() => {
                      const cat = productCategories[mobileScreen.catId];
                      return (
                        <div className="py-4">
                          <div
                            className="px-6 pt-2 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          >
                            Sub Categories
                          </div>

                          {cat.subcategories.map((sub, idx) => (
                            <div key={sub.name}>
                              <button
                                onClick={() => goForward({ screen: "products", catId: mobileScreen.catId, subId: idx })}
                                className="w-full flex items-center justify-between group transition-colors"
                                style={{ minHeight: 56, paddingLeft: 24, paddingRight: 24 }}
                              >
                                <span
                                  className="text-[14px] font-semibold tracking-wide text-left leading-snug"
                                  style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.9)" }}
                                >
                                  {sub.name}
                                </span>
                                <ChevronRight
                                  size={15}
                                  strokeWidth={2.5}
                                  className="flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform"
                                  style={{ color: "rgba(255,255,255,0.3)" }}
                                />
                              </button>
                              {idx < cat.subcategories.length - 1 && (
                                <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: 24 }} />
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* ════ SCREEN 4: Products ════ */}
                    {mobileScreen.screen === "products" && (() => {
                      const cat = productCategories[mobileScreen.catId];
                      const sub = cat.subcategories[mobileScreen.subId];
                      const catSlug = cat.href.split("/").pop();
                      const subSlug = sub.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

                      return (
                        <div className="py-4">
                          <div
                            className="px-6 pt-2 pb-3 text-[10px] font-bold tracking-[0.18em] uppercase"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          >
                            Products
                          </div>

                          {/* Individual products */}
                          {sub.products.map((prod, idx) => {
                            const productSlug = prod.href.split("/").pop();
                            const href = `/products/${catSlug}/${subSlug}/${productSlug}`;
                            return (
                              <div key={prod.name}>
                                <Link
                                  href={href}
                                  onClick={closeMobileMenu}
                                  className="flex items-center justify-between group transition-all"
                                  style={{ minHeight: 52, paddingLeft: 24, paddingRight: 24 }}
                                >
                                  <span
                                    className="text-[14px] font-medium tracking-wide text-left leading-snug"
                                    style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.85)" }}
                                  >
                                    {prod.name}
                                  </span>
                                  <ChevronRight
                                    size={14}
                                    strokeWidth={2}
                                    className="flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                  />
                                </Link>
                                {idx < sub.products.length - 1 && (
                                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: 24 }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Drawer Footer ── */}
              <div
                className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Axion Technology
                </span>
                <div className="flex items-center gap-4">
                  <FaLinkedinIn size={13} style={{ color: "rgba(255,255,255,0.3)" }} className="cursor-pointer hover:text-white transition-colors" />
                  <FaInstagram size={13} style={{ color: "rgba(255,255,255,0.3)" }} className="cursor-pointer hover:text-white transition-colors" />
                  <FaWhatsapp size={13} style={{ color: "rgba(255,255,255,0.3)" }} className="cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
