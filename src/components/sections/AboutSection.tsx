"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY_STATS, getYearsExperience } from "@/lib/constants";

const keyPoints = [
  "Advanced Engineering & Custom Solutions",
  "Middle East & Europe Strategic Presence",
  "In-house High-Capacity Manufacturing",
  "Stringent Quality Control Standards",
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge="About Axion Technology"
              title="Global Leaders in Visual Engineering Excellence"
              align="left"
            />

            <div className="space-y-6 mb-10">
              <p className="text-slate-600 leading-relaxed">
                Axion Technology is a premier engineering-driven provider of advanced visual solutions.
                With over two decades of experience in the technology sector, we combine
                traditional engineering values with cutting-edge visual innovation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our operations span across Asia, the Middle East, and Europe, allowing us to deliver
                high-impact visual infrastructure for the world's most demanding projects, from
                command centers to international stadiums.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {keyPoints.map((point) => (
                <div key={point} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[rgb(2,23,82)] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-primary">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="px-8">Company Profile</Button>
              <Button variant="outline" className="px-8">Our Capabilities</Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="Axion Technology Showroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[rgb(2,23,82)] p-8 shadow-xl hidden md:block">
              <div className="text-white">
                <div className="text-4xl font-black mb-1">{getYearsExperience()}+</div>
                <div className="text-xs uppercase tracking-widest font-bold opacity-80">Years of History</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
