export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductDownload {
  title: string;
  type: string;
  size: string;
  url: string;
}

export interface ProductAccessory {
  label: string;
  value: string;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface ProductData {
  slug: string;
  title: string;
  category: string;
  description: string;
  heroImage: string;
  keySpecs: ProductSpec[];
  features: ProductFeature[];
  specifications: ProductSpec[];
  accessories: ProductAccessory[];
  downloads: ProductDownload[];
  gallery: GalleryItem[];
}

export const products: ProductData[] = [
  {
    slug: "led-display-systems",
    title: "LED Display Systems",
    category: "LED Displays",
    description:
      "Professional LED display solutions for events, command centers, retail spaces, exhibitions, and immersive visual environments.",
    heroImage:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "Resolution", value: "P1.25–P6.25" },
      { label: "Brightness", value: "800–6000 nits" },
      { label: "Refresh Rate", value: "Up to 3840 Hz" },
      { label: "Gray Scale", value: "16-bit" },
    ],
    features: [
      {
        title: "Ultra-High Refresh Rate",
        description:
          "Up to 3840 Hz refresh rate ensures flicker-free visuals even under high-speed camera capture.",
      },
      {
        title: "Front & Rear Serviceability",
        description:
          "Tool-free magnetic module access dramatically reduces maintenance time and operational downtime.",
      },
      {
        title: "Pixel-Perfect Calibration",
        description:
          "Factory-calibrated panels with BT.2020 wide color gamut deliver true-to-life color accuracy.",
      },
      {
        title: "Lightweight Cabinet Design",
        description:
          "Die-cast aluminum cabinets weigh under 9 kg, enabling rapid rigging for rental & staging.",
      },
      {
        title: "Seamless Tiling",
        description:
          "Sub-0.1 mm gap tolerance between cabinets guarantees a virtually invisible seam at any scale.",
      },
      {
        title: "Universal Signal Support",
        description:
          "DVI / HDMI 2.0 / DisplayPort / Fiber inputs compatible with all major video processing systems.",
      },
    ],
    specifications: [
      { label: "Resolution", value: "P1.25 / P1.56 / P1.875 / P2.5 / P2.97 / P3.91" },
      { label: "Cabinet Size", value: "500×500 mm / 500×1000 mm" },
      { label: "Module Size", value: "250×250 mm" },
      { label: "Brightness", value: "800–6000 nits (model dependent)" },
      { label: "Viewing Angle", value: "160°H / 160°V (indoor) · 140°H / 140°V (outdoor)" },
      { label: "Gray Scale", value: "16-bit" },
      { label: "Refresh Rate", value: "1920 Hz – 3840 Hz" },
      { label: "Power Requirements", value: "Max 350 W – 800 W per cabinet" },
      { label: "Operating Temperature", value: "-10°C ~ 55°C" },
      { label: "Signal Compatibility", value: "DVI / HDMI / DisplayPort / Fiber" },
      { label: "Control Systems", value: "Novastar / Colorlight / Linsn" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Custom ATA-rated flight cases for all cabinet sizes" },
      { label: "Hanging Bars", value: "Quick-release aluminum hanging bars, load-rated to 300 kg" },
      { label: "Ground Support Systems", value: "Modular ground-support towers with leveling feet" },
      { label: "Processors", value: "Novastar VX series / Colorlight Z series" },
      { label: "Sending Cards", value: "Novastar MCTRL series, dual-port fiber" },
      { label: "Power Cables", value: "IEC C13/C19 locking cables, 1 m / 3 m / 5 m" },
      { label: "Signal Cables", value: "Cat6 shielded, fiber patch, HDMI 2.0 certified" },
      { label: "Spare Modules", value: "Individual pixel modules and driver boards available" },
      { label: "Mounting Accessories", value: "Wall-mount brackets, curved-frame kits, yoke mounts" },
    ],
    downloads: [
      { title: "LED Display Datasheet", type: "PDF", size: "2.4 MB", url: "#" },
      { title: "Technical Drawing Package", type: "DWG/PDF", size: "8.1 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "5.7 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "3.2 MB", url: "#" },
      { title: "CE / RoHS Certifications", type: "PDF", size: "1.1 MB", url: "#" },
      { title: "Product Brochure", type: "PDF", size: "6.5 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800", caption: "Concert Stage Installation" },
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", caption: "Corporate Event" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Retail Environment" },
      { src: "https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800", caption: "Control Room Application" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Exhibition Display" },
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", caption: "Corporate Installation" },
    ],
  },
  {
    slug: "lcd-screens-&-interactive-kiosks",
    title: "LCD Screens & Interactive Kiosks",
    category: "LCD & Interactive",
    description:
      "Advanced touch displays, kiosks, signage systems, and collaboration solutions for modern interactive experiences.",
    heroImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "Screen Size", value: "32\"–110\"" },
      { label: "Resolution", value: "4K UHD" },
      { label: "Touch Points", value: "Up to 40-point" },
      { label: "Brightness", value: "350–2500 nits" },
    ],
    features: [
      { title: "40-Point Multi-Touch", description: "Industrial-grade IR touch technology with 40 simultaneous touch points for collaborative environments." },
      { title: "4K UHD Panel", description: "Ultra-high-definition IPS panels deliver stunning color accuracy and wide viewing angles." },
      { title: "Fanless Operation", description: "Silent, fanless design eliminates dust accumulation and ensures reliable 24/7 operation." },
      { title: "Built-in Android & Windows", description: "Dual-OS support with OPS slot for plug-and-play PC module integration." },
      { title: "Anti-Glare Coating", description: "Hardened glass with anti-glare treatment reduces reflections in bright ambient environments." },
      { title: "Remote Management", description: "Cloud-based CMS for remote content scheduling, monitoring, and firmware updates." },
    ],
    specifications: [
      { label: "Resolution", value: "3840×2160 (4K UHD)" },
      { label: "Cabinet Size", value: "32\" / 55\" / 65\" / 75\" / 86\" / 110\"" },
      { label: "Module Size", value: "N/A (integrated panel)" },
      { label: "Brightness", value: "350–2500 nits" },
      { label: "Viewing Angle", value: "178°H / 178°V" },
      { label: "Gray Scale", value: "10-bit" },
      { label: "Refresh Rate", value: "60 Hz / 120 Hz" },
      { label: "Power Requirements", value: "150–600 W (size dependent)" },
      { label: "Operating Temperature", value: "0°C ~ 40°C" },
      { label: "Signal Compatibility", value: "HDMI 2.0 / DisplayPort / VGA / USB-C" },
      { label: "Control Systems", value: "RS232 / LAN / IR / Android CMS" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Foam-padded transport cases for 55\"–86\" screens" },
      { label: "Hanging Bars", value: "VESA-compatible ceiling suspension kits" },
      { label: "Ground Support Systems", value: "Height-adjustable floor stands with cable management" },
      { label: "Processors", value: "OPS-format i5/i7 PC modules" },
      { label: "Sending Cards", value: "N/A" },
      { label: "Power Cables", value: "Country-specific power cords included" },
      { label: "Signal Cables", value: "HDMI 2.0 / USB-C certified cables" },
      { label: "Spare Modules", value: "Touch frame and power supply units" },
      { label: "Mounting Accessories", value: "Tilt wall mounts, flush wall brackets, trolley carts" },
    ],
    downloads: [
      { title: "LCD Kiosk Datasheet", type: "PDF", size: "1.8 MB", url: "#" },
      { title: "Technical Drawing Package", type: "PDF", size: "4.2 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "3.9 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "2.1 MB", url: "#" },
      { title: "CE / UL Certifications", type: "PDF", size: "0.9 MB", url: "#" },
      { title: "Product Brochure", type: "PDF", size: "5.0 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", caption: "Interactive Kiosk" },
      { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", caption: "Digital Signage" },
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", caption: "Collaboration Display" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", caption: "Retail Signage" },
      { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", caption: "Control Room" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Corporate Lobby" },
    ],
  },
  {
    slug: "lighting-systems",
    title: "Lighting Systems",
    category: "Professional Lighting",
    description:
      "Professional stage and architectural lighting systems engineered for live events and entertainment productions.",
    heroImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "Output", value: "Up to 60,000 lm" },
      { label: "Color Temp", value: "2700K–6500K" },
      { label: "Beam Angle", value: "0.5°–60°" },
      { label: "Protocol", value: "DMX-512 / RDM" },
    ],
    features: [
      { title: "CMY + CTO Color Mixing", description: "Precise CMY subtractive color mixing with CTO correction for cinematic color control." },
      { title: "Framing Shutters", description: "4-blade framing system with independent rotation for precise beam shaping on any surface." },
      { title: "Silent Operation", description: "DC brushless motors and optimized fan placement keep noise below 35 dB for theatrical use." },
      { title: "IP65 Rated Outdoor Units", description: "Fully sealed outdoor fixtures rated IP65 resist dust, rain, and harsh weather." },
      { title: "RDM Remote Control", description: "Bi-directional RDM protocol enables remote addressing and real-time diagnostic feedback." },
      { title: "LED Engine Longevity", description: "50,000+ hour rated LED engines with <2% lumen depreciation at 25,000 hours." },
    ],
    specifications: [
      { label: "Resolution", value: "N/A" },
      { label: "Cabinet Size", value: "Various (fixture dependent)" },
      { label: "Module Size", value: "N/A" },
      { label: "Brightness", value: "5,000–60,000 lumens" },
      { label: "Viewing Angle", value: "0.5°–60° variable" },
      { label: "Gray Scale", value: "16-bit dimming" },
      { label: "Refresh Rate", value: "N/A" },
      { label: "Power Requirements", value: "120–1500 W" },
      { label: "Operating Temperature", value: "-20°C ~ 45°C" },
      { label: "Signal Compatibility", value: "DMX-512 / RDM / Art-Net / sACN" },
      { label: "Control Systems", value: "Grand MA / Avolites / ETC EOS" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Custom truss-mounted flight cases per fixture type" },
      { label: "Hanging Bars", value: "Omega clamps, top hats, barn doors" },
      { label: "Ground Support Systems", value: "Base plates and safety cables" },
      { label: "Processors", value: "MA Network Switches / Luminex" },
      { label: "Sending Cards", value: "DMX splitters / opto-isolators" },
      { label: "Power Cables", value: "Socapex 19-pin / IEC locking power cables" },
      { label: "Signal Cables", value: "5-pin XLR DMX cables, 1–30 m" },
      { label: "Spare Modules", value: "Replacement LED engines and gobo wheels" },
      { label: "Mounting Accessories", value: "Truss clamps, follow-spot stands, yoke brackets" },
    ],
    downloads: [
      { title: "Lighting Systems Datasheet", type: "PDF", size: "3.1 MB", url: "#" },
      { title: "Photometric Data (IES)", type: "IES", size: "0.5 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "4.8 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "2.7 MB", url: "#" },
      { title: "CE Certifications", type: "PDF", size: "1.0 MB", url: "#" },
      { title: "Product Brochure", type: "PDF", size: "7.2 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800", caption: "Concert Stage" },
      { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800", caption: "Live Event" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Conference Lighting" },
      { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800", caption: "Festival Production" },
      { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800", caption: "Architectural Lighting" },
      { src: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?w=800", caption: "Theatrical Production" },
    ],
  },
  {
    slug: "professional-audio-systems",
    title: "Professional Audio Systems",
    category: "Professional Audio",
    description:
      "High-performance audio systems including speakers, amplifiers, DSP systems, and installation audio solutions.",
    heroImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "SPL", value: "Up to 145 dB" },
      { label: "Frequency", value: "30 Hz–20 kHz" },
      { label: "Amplifier", value: "Up to 20,000 W" },
      { label: "Coverage", value: "Up to 120°×15°" },
    ],
    features: [
      { title: "Constant Curvature Line Array", description: "Precision-engineered waveguides deliver consistent SPL across large venues with minimal phase issues." },
      { title: "Class-D Amplification", description: "Integrated Class-D amplifiers deliver 95%+ efficiency with built-in DSP and limiter protection." },
      { title: "FIR-Phase Correction", description: "Linear-phase FIR filters ensure time-aligned output across all frequency bands." },
      { title: "Dante / AES67 Network Audio", description: "Dante-enabled systems allow low-latency audio distribution over standard Ethernet infrastructure." },
      { title: "Rigging Safety System", description: "Integrated multi-point rigging with mechanical load indicators and secondary safety steel cables." },
      { title: "Real-Time Monitoring", description: "Built-in sensors monitor temperature, impedance, and excursion for predictive fault management." },
    ],
    specifications: [
      { label: "Resolution", value: "N/A" },
      { label: "Cabinet Size", value: "Various line-array and subwoofer enclosures" },
      { label: "Module Size", value: "N/A" },
      { label: "Brightness", value: "Max SPL 135–145 dB" },
      { label: "Viewing Angle", value: "60°–120° horizontal coverage" },
      { label: "Gray Scale", value: "N/A" },
      { label: "Refresh Rate", value: "N/A" },
      { label: "Power Requirements", value: "1500–20,000 W (system)" },
      { label: "Operating Temperature", value: "-10°C ~ 50°C" },
      { label: "Signal Compatibility", value: "AES/EBU / Dante / Analog XLR" },
      { label: "Control Systems", value: "Lake / Dolby Lake / proprietary DSP" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Stacking casters and road-ready covers for all enclosures" },
      { label: "Hanging Bars", value: "M10 flying frames and spreader bars" },
      { label: "Ground Support Systems", value: "Speaker poles, base plates, sub-stacks frames" },
      { label: "Processors", value: "Lake LM 44 / BSS Soundweb / dbx DriveRack" },
      { label: "Sending Cards", value: "Dante virtual soundcard, Dante AVIO adapters" },
      { label: "Power Cables", value: "Powercon locking cables, distro panels" },
      { label: "Signal Cables", value: "3-pin / 5-pin XLR, Cat6 for Dante" },
      { label: "Spare Modules", value: "Replacement drivers, compression drivers, networks" },
      { label: "Mounting Accessories", value: "U-brackets, wall-mount adapters, delay column frames" },
    ],
    downloads: [
      { title: "Audio Systems Datasheet", type: "PDF", size: "2.9 MB", url: "#" },
      { title: "Polar Pattern Data", type: "PDF", size: "1.4 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "6.1 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "3.8 MB", url: "#" },
      { title: "CE / FCC Certifications", type: "PDF", size: "1.2 MB", url: "#" },
      { title: "Product Brochure", type: "PDF", size: "5.5 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800", caption: "Line Array Installation" },
      { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800", caption: "Festival Production" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Corporate Event" },
      { src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800", caption: "Concert Hall" },
      { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800", caption: "House of Worship" },
      { src: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800", caption: "Conference Room Audio" },
    ],
  },
  {
    slug: "power-distribution-&-cable-solutions",
    title: "Power Distribution & Cable Solutions",
    category: "Power & Cabling",
    description:
      "Reliable power distribution systems, signal management solutions, and professional-grade cabling.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "Max Current", value: "Up to 400 A" },
      { label: "Input Voltage", value: "100–240 V AC" },
      { label: "Protection", value: "IP44 / IP65" },
      { label: "Outlets", value: "Up to 48 circuits" },
    ],
    features: [
      { title: "Intelligent Load Monitoring", description: "Per-circuit current monitoring with automatic overload alerts and remote breaker control." },
      { title: "Remote Switching", description: "Individual circuit switching via Ethernet / DMX / proprietary app for full remote control." },
      { title: "Surge Protection", description: "MOV-based transient surge protection on all outputs safeguards connected equipment." },
      { title: "Modular Architecture", description: "19\" rack-mount modules allow custom configuration from 6 to 48 circuits in a single chassis." },
      { title: "Locking Connectors", description: "Twist-lock and Powercon outlets prevent accidental disconnection under load." },
      { title: "Real-Time Energy Metering", description: "Built-in kWh metering and power-factor monitoring for accurate energy reporting." },
    ],
    specifications: [
      { label: "Resolution", value: "N/A" },
      { label: "Cabinet Size", value: "1U–4U 19\" rack mount" },
      { label: "Module Size", value: "N/A" },
      { label: "Brightness", value: "N/A" },
      { label: "Viewing Angle", value: "N/A" },
      { label: "Gray Scale", value: "N/A" },
      { label: "Refresh Rate", value: "N/A" },
      { label: "Power Requirements", value: "Single / Three phase 100–240 V, up to 400 A" },
      { label: "Operating Temperature", value: "-10°C ~ 50°C" },
      { label: "Signal Compatibility", value: "DMX-512 / Ethernet / RS232" },
      { label: "Control Systems", value: "Proprietary app / DMX console / Web UI" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Rack-mount road cases, 4U–16U" },
      { label: "Hanging Bars", value: "Rack rails and cage nuts" },
      { label: "Ground Support Systems", value: "PDU rack stands and ground-distribution adapters" },
      { label: "Processors", value: "N/A" },
      { label: "Sending Cards", value: "N/A" },
      { label: "Power Cables", value: "Socapex, Powercon, IEC, CEE locking sets" },
      { label: "Signal Cables", value: "DMX, Ethernet, RS232 cables" },
      { label: "Spare Modules", value: "Replacement MCBs and outlet modules" },
      { label: "Mounting Accessories", value: "Rack ears, velcro cable management, color labels" },
    ],
    downloads: [
      { title: "PDU Datasheet", type: "PDF", size: "1.5 MB", url: "#" },
      { title: "Wiring Diagrams", type: "PDF", size: "3.0 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "2.8 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "1.9 MB", url: "#" },
      { title: "CE / IEC Certifications", type: "PDF", size: "0.8 MB", url: "#" },
      { title: "Product Brochure", type: "PDF", size: "4.0 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Power Distribution Unit" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "Cable Management" },
      { src: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=800", caption: "Event Power Setup" },
      { src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", caption: "Rack Installation" },
      { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", caption: "Signal Distribution" },
      { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", caption: "Stage Power System" },
    ],
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
