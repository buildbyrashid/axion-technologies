import Link from "next/link";
import { Mail, Phone, MapPin, } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  products: [
    { name: "LED Display Systems", href: "#" },
    { name: "LCD & Kiosks", href: "#" },
    { name: "Lighting Systems", href: "#" },
    { name: "Audio Systems", href: "#" },
    { name: "Power Solutions", href: "#" },
  ],
  solutions: [
    { name: "Live Events", href: "#" },
    { name: "Corporate", href: "#" },
    { name: "Retail & Signage", href: "#" },
    { name: "Museums", href: "#" },
    { name: "Command Centers", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Our Process", href: "#" },
    { name: "Global Network", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-20">
          {/* Brand & Contact */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="font-black text-2xl tracking-tighter brightness-0 invert">
              AXION<span className="text-accent">TECH</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Engineering advanced visual technology solutions for global enterprise environments.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-slate-400 text-sm">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                solutions@axiontech.com
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                +852 2345 6789
              </div>
              <div className="flex items-start text-slate-400 text-sm">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-accent shrink-0" />
                Unit 1205, Energy Plaza, TST East, Hong Kong
              </div>
            </div>
          </div>

          {/* Links Groups */}
          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:grid md:grid-cols-3 md:items-center space-y-6 md:space-y-0 text-center md:text-left">
          {/* Copyright - Left */}
          <p className="text-slate-500 text-sm">
            © 2026 Axion Technology Co Ltd. All rights reserved.
          </p>

          {/* Credits - Center */}
          <div className="flex justify-center">
            <p className="text-xs text-slate-600 tracking-wide">
              Crafted by{" "}
              <a 
                href="https://www.ekodrix.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-slate-400 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20"
              >
                Ekodrix
              </a>
            </p>
          </div>

          {/* Legal Links - Right */}
          <div className="flex justify-center md:justify-end space-x-6 lg:space-x-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
