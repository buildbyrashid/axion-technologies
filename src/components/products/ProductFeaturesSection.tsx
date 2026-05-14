"use client";

import { useRef } from "react";
import {
  Cpu,
  Zap,
  Settings2,
  Gauge,
  Wrench,
  Layers3,
  ShieldCheck,
  Boxes,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  dark?: boolean;
};

const features: FeatureCard[] = [
  {
    title: "Key Technical Advantages",
    description:
      "Advanced engineering architecture designed for high performance, reliability, and precision operation.",
    icon: <Cpu size={28} />,
    dark: true,
  },
  {
    title: "Engineering Highlights",
    description:
      "Built with industrial-grade components and optimized systems for long-term operational stability.",
    icon: <Settings2 size={28} />,
  },
  {
    title: "Compatibility Information",
    description:
      "Seamlessly integrates with multiple industrial platforms, devices, and workflow environments.",
    icon: <Layers3 size={28} />,
  },
  {
    title: "Energy Efficiency",
    description:
      "Low power consumption technology reduces operational costs while maintaining peak efficiency.",
    icon: <Zap size={28} />,
  },
  {
    title: "Calibration Technologies",
    description:
      "Precision calibration systems ensure accurate measurements and consistent industrial performance.",
    icon: <Gauge size={28} />,
  },
  {
    title: "Installation Flexibility",
    description:
      "Flexible mounting and deployment options simplify integration across various environments.",
    icon: <Boxes size={28} />,
  },
  {
    title: "Maintenance Access",
    description:
      "Quick-access maintenance design minimizes downtime and improves service efficiency.",
    icon: <Wrench size={28} />,
  },
  {
    title: "Processing Compatibility",
    description:
      "Supports diverse industrial processing systems with secure and stable communication.",
    icon: <ShieldCheck size={28} />,
  },
];

export default function ProductFeaturesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -380,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-16 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-white p-4 sm:p-6 md:p-10 border border-blue-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-[28px] leading-[36px] sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0f172a]">
              Advanced Product Features
            </h2>

            <p className="mt-3 sm:mt-4 text-sm md:text-base leading-6 md:leading-7 text-slate-600 max-w-2xl">
              Explore innovative engineering solutions designed to deliver
              superior performance, operational flexibility, and seamless
              industrial integration.
            </p>
          </div>

          {/* Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white text-[#2563eb] transition-all duration-300 hover:bg-blue-50"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white transition-all duration-300 hover:bg-[#1d4ed8]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="mt-8 sm:mt-10 md:mt-12 flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-1 pb-2 snap-x snap-mandatory"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`min-w-[85%] sm:min-w-[300px] rounded-[28px] p-5 sm:p-7 transition-all duration-300 border border-blue-100 snap-center ${
                feature.dark
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#eff6ff] text-[#0f172a]"
              }`}
            >
              {/* Icon */}
              <div
                className={`mb-6 sm:mb-8 ${
                  feature.dark ? "text-white" : "text-[#2563eb]"
                }`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-[22px] sm:text-[20px] font-bold leading-[30px] sm:leading-[38px] ${
                  feature.dark ? "text-white" : "text-black"
                }`}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-4 sm:mt-5 text-sm leading-6 ${
                  feature.dark ? "text-blue-100" : "text-slate-600"
                }`}
              >
                {feature.description}
              </p>

              {/* Button */}
              <button
                className={`mt-6 sm:mt-8 w-full sm:w-fit rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  feature.dark
                    ? "bg-white text-[#2563eb] hover:bg-blue-50"
                    : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                }`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}