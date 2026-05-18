"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ProductDropdown, { productCategories } from "./ProductDropdown";
import QuoteModal from "@/components/modals/QuoteModal";

const navLinks = [
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Solutions", href: "/solutions", hasDropdown: false },
  { name: "Industries", href: "/industries", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];


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
          <div className="flex items-center space-x-4 mr-0 border-none pr-0">
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

function NavLink({ link, isScrolled, pathname }: { link: any; isScrolled: boolean; pathname: string }) {
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
            ? (isActive ? "text-accent" : "text-slate-700 hover:text-accent")
            : (isActive ? "text-accent" : "text-white hover:text-accent")
        )}
      >
        {link.name}
        {link.hasDropdown && (
          <ChevronDown className={cn(
            "h-3.5 w-3.5 ml-1 opacity-50 transition-transform duration-300",
            isHovered && "rotate-180"
          )} />
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

export default function Navbar() {

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [mobileProductLevel, setMobileProductLevel] = useState<{
    level: "categories" | "subcategories" | "products";
    catId?: number;
    subId?: number;
  }>({ level: "categories" });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
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

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  link={link}
                  isScrolled={isScrolled}
                  pathname={pathname}
                />
              ))}

              <div className="pl-6 flex items-center space-x-4">
                <div className={cn(
                  "h-8 w-px bg-slate-200 hidden xl:block",
                  !isScrolled && "bg-white/20"
                )} />
                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className={cn(
                    "rounded-none-none px-8 py-6 font-bold text-[14px] transition-all",
                    isScrolled
                      ? "bg-accent text-white hover:bg-[#021752]"
                      : "bg-white text-primary hover:bg-accent hover:text-white"
                  )}
                >
                  Get a Quote Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-none-none transition-colors",
                isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <div className="relative h-8 w-32">
                  <Image
                    src="/images/company/logo-light1.png"
                    alt="Axion Technology"
                    fill
                    className="object-contain"
                  />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  // ————— Products: accordion with category sub-links —————————————
                  if (link.hasDropdown) {
                    return (
                      <div key={link.name}>
                        {/* Row: tap label —> toggle submenu */}
                        <button
                          onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                          className={cn(
                            "w-full flex items-center justify-between p-4 rounded-none-none text-base font-bold transition-all",
                            isActive ? "bg-accent/10 text-accent" : "text-slate-900 hover:bg-slate-50"
                          )}
                        >
                          {link.name}
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              isMobileProductsOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Submenu — drill-down list */}
                        <AnimatePresence mode="wait">
                          {isMobileProductsOpen && (
                            <motion.div
                              key={`${mobileProductLevel.level}-${mobileProductLevel.catId}-${mobileProductLevel.subId}`}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3 space-y-1"
                            >
                              {/* Level: Categories */}
                              {mobileProductLevel.level === "categories" && (
                                <>
                                  {productCategories.map((cat, idx) => (
                                    <button
                                      key={cat.name}
                                      onClick={() => setMobileProductLevel({ level: "subcategories", catId: idx })}
                                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-none text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                                    >
                                      <span className="text-left">{cat.name}</span>
                                      <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                                    </button>
                                  ))}
                                </>
                              )}

                              {/* Level: Subcategories */}
                              {mobileProductLevel.level === "subcategories" && (
                                <>
                                  {/* Back Button */}
                                  <button
                                    onClick={() => setMobileProductLevel({ level: "categories" })}
                                    className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-blue-600 hover:text-accent transition-all mb-2"
                                  >
                                    <ArrowLeft size={14} />
                                    Back to Categories
                                  </button>

                                  <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                                    {productCategories[mobileProductLevel.catId!].name}
                                  </div>

                                  {productCategories[mobileProductLevel.catId!].subcategories.map((sub, idx) => {
                                    return (
                                      <button
                                        key={sub.name}
                                        onClick={() => setMobileProductLevel({ level: "products", catId: mobileProductLevel.catId, subId: idx })}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-none text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                                      >
                                        <span className="text-left">{sub.name}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                                      </button>
                                    );
                                  })}
                                </>
                              )}

                              {/* Level: Products */}
                              {mobileProductLevel.level === "products" && (
                                <>
                                  {/* Back Button */}
                                  <button
                                    onClick={() => setMobileProductLevel({ level: "subcategories", catId: mobileProductLevel.catId })}
                                    className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-blue-600 hover:text-accent transition-all mb-2"
                                  >
                                    <ArrowLeft size={14} />
                                    Back to Subcategories
                                  </button>

                                  <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                                    {productCategories[mobileProductLevel.catId!].subcategories[mobileProductLevel.subId!].name}
                                  </div>

                                  {/* "All [Subcategory] Products" link */}
                                  {(() => {
                                    const catSlug = productCategories[mobileProductLevel.catId!].href.split('/').pop();
                                    const subSlug = productCategories[mobileProductLevel.catId!].subcategories[mobileProductLevel.subId!].name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                    const subcategoryHref = `/products/${catSlug}/${subSlug}`;
                                    return (
                                      <Link
                                        href={subcategoryHref}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setIsMobileProductsOpen(false);
                                        }}
                                        className="flex items-center justify-between px-4 py-3 rounded-none text-[14px] font-bold text-blue-600 bg-blue-50/50 mb-2 border-b border-blue-100"
                                      >
                                        <span>All {productCategories[mobileProductLevel.catId!].subcategories[mobileProductLevel.subId!].name}</span>
                                        <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0 ml-2" />
                                      </Link>
                                    );
                                  })()}

                                  {/* Individual Products List */}
                                  {productCategories[mobileProductLevel.catId!].subcategories[mobileProductLevel.subId!].products.map((prod) => {
                                    const categorySlug = productCategories[mobileProductLevel.catId!].href.split('/').pop();
                                    const subcategorySlug = productCategories[mobileProductLevel.catId!].subcategories[mobileProductLevel.subId!].name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                    const productSlug = prod.href.split('/').pop();
                                    const dynamicHref = `/products/${categorySlug}/${subcategorySlug}/${productSlug}`;
                                    return (
                                      <Link
                                        key={prod.name}
                                        href={dynamicHref}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false);
                                          setIsMobileProductsOpen(false);
                                        }}
                                        className="flex items-center justify-between px-4 py-3 rounded-none text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-accent transition-all border-b border-slate-50 last:border-0"
                                      >
                                        <span className="text-left">{prod.name}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
                                      </Link>
                                    );
                                  })}
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // ————— All other links: unchanged behaviour —————————————————
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center p-4 rounded-none-none text-base font-bold transition-all",
                        isActive ? "bg-accent/10 text-accent" : "text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t bg-slate-50 space-y-4">
                <div className="space-y-3">
                  <a href="mailto:solutions@axiontech.com" className="flex items-center text-sm text-slate-600">
                    <Mail className="h-4 w-4 mr-3 text-accent" />
                    solutions@axiontech.com
                  </a>
                  <a href="tel:+85223456789" className="flex items-center text-sm text-slate-600">
                    <Phone className="h-4 w-4 mr-3 text-accent" />
                    +852 2345 6789
                  </a>
                </div>
                <Button
                  onClick={() => {
                    setIsQuoteModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-none-none h-14 bg-accent text-white font-bold text-lg"
                >
                  Get a Quote Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
