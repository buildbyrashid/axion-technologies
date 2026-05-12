"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const industries = [
  { name: "Live Events", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80" },
  { name: "Exhibitions", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" },
  { name: "Corporate", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" },
  { name: "Museums", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80" },
  { name: "Retail", image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80" },
  { name: "Command Centers", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80" },
  { name: "Hospitality", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" },
  { name: "House of Worship", image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80" },
  { name: "Aquariums", image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80" },
  { name: "Education", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block"
          >
            Industries Served
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-sora font-extrabold text-primary tracking-tighter"
          >
            Engineering Visuals for <br /> Every Domain
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] overflow-hidden bg-black"
            >
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white font-sora font-bold text-lg mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {industry.name}
                </h3>
                <Link 
                  href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 text-accent text-sm font-bold opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

