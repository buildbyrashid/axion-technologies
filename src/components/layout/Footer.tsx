import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, } from "lucide-react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";
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
            <div className="relative h-14 w-64 mb-8">
              <Image
                src="/images/company/logo-dark.png"
                alt="Axion Technology"
                fill
                sizes="(max-width: 768px) 160px, 256px"
                className="object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Engineering advanced visual technology solutions for global enterprise environments.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-slate-300 text-sm">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                sales@axiontechnology.com
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <FaWhatsapp className="h-4 w-4 mr-3 text-accent" />
                +852 2345 6789
              </div>
              <div className="flex items-start text-slate-300 text-sm">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-accent shrink-0" />
                Hong Kong | Shenzhen | Dubai
              </div>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-accent transition-all duration-300">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-accent transition-all duration-300">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-accent transition-all duration-300">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-accent transition-all duration-300">
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Groups */}
          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg text-white font-sora">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg text-white font-sora">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-bold mb-6 text-base lg:text-lg text-white font-sora">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-accent transition-colors text-sm font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:grid md:grid-cols-3 md:items-center space-y-6 md:space-y-0 text-center md:text-left">
          {/* Copyright - Left */}
          <p className="text-slate-500 text-sm font-light">
            © 2026 Axion Technology Co Ltd. All rights reserved.
          </p>

          {/* Credits - Center */}
          <div className="flex justify-center">
            <p className="text-xs text-slate-600 tracking-wide font-light">
              Crafted by{" "}
              <a 
                href="https://www.ekodrix.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-slate-500 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20"
              >
                Ekodrix
              </a>
            </p>
          </div>

          {/* Legal Links - Right */}
          <div className="flex justify-center md:justify-end space-x-6 lg:space-x-8 text-sm text-slate-500 font-light">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
