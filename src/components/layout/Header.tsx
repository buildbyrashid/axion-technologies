'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';

const productCategories = [
  { label: 'LED Display Systems', href: '/products/led-display-systems' },
  { label: 'LCD Screens & Interactive Kiosks', href: '/products/lcd-interactive-kiosks' },
  { label: 'Lighting Systems', href: '/products/lighting-systems' },
  { label: 'Professional Audio Systems', href: '/products/professional-audio' },
  { label: 'Power Distribution & Cable Solutions', href: '/products/power-distribution' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      role="banner"
    >
      <nav className="container header__nav" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="header__logo" aria-label="Axion Technology Home">
          <div className="header__logo-icon">
            <Zap size={20} strokeWidth={2.5} />
          </div>
          <div className="header__logo-text">
            <span className="header__logo-name">AXION</span>
            <span className="header__logo-sub">TECHNOLOGY</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="header__links" role="list">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li key={link.href} ref={dropdownRef} className="header__dropdown-wrapper">
                <button
                  id="products-menu-btn"
                  className={`header__link header__link--btn${isActive(link.href) ? ' header__link--active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((v) => !v)}
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  {link.label}
                  <ChevronDown
                    size={15}
                    className={`header__chevron${dropdownOpen ? ' header__chevron--open' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="header__dropdown"
                    role="menu"
                    aria-labelledby="products-menu-btn"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="header__dropdown-header">Product Categories</div>
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className={`header__dropdown-item${pathname === cat.href ? ' header__dropdown-item--active' : ''}`}
                        role="menuitem"
                      >
                        <span className="header__dropdown-dot" />
                        {cat.label}
                      </Link>
                    ))}
                    <div className="header__dropdown-footer">
                      <Link href="/products" className="header__dropdown-all">
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`header__link${isActive(link.href) ? ' header__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="header__cta" id="header-cta">
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className="header__mobile-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`header__mobile${mobileOpen ? ' header__mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`header__mobile-link${isActive(link.href) ? ' header__mobile-link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="header__mobile-cta">
              Get a Quote
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
