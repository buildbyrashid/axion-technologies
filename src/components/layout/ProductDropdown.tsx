"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface Product {
  name: string;
  image: string;
  href: string;
}

interface SubCategory {
  name: string;
  products: Product[];
}

export interface Category {
  name: string;
  href: string;
  subcategories: SubCategory[];
}

export const productCategories: Category[] = [
  {
    "name": "LED DISPLAY SYSTEMS",
    "href": "/products/led-display-systems",
    "subcategories": [
      {
        "name": "Indoor Rental LED Displays",
        "products": [
          {
            "name": "Pro Series Indoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/indoor-rental-led-displays/pro-series"
          },
          {
            "name": "Elite Indoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/indoor-rental-led-displays/elite"
          },
          {
            "name": "Ultra Indoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/indoor-rental-led-displays/ultra"
          }
        ]
      },
      {
        "name": "Outdoor Rental LED Displays",
        "products": [
          {
            "name": "Pro Series Outdoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-rental-led-displays/pro-series"
          },
          {
            "name": "Elite Outdoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-rental-led-displays/elite"
          },
          {
            "name": "Ultra Outdoor Rental LED Displays",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-rental-led-displays/ultra"
          }
        ]
      },
      {
        "name": "Fine Pitch LED Displays",
        "products": [
          {
            "name": "Pro Series Fine Pitch LED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fine-pitch-led-displays/pro-series"
          },
          {
            "name": "Elite Fine Pitch LED Displays",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fine-pitch-led-displays/elite"
          },
          {
            "name": "Ultra Fine Pitch LED Displays",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fine-pitch-led-displays/ultra"
          }
        ]
      },
      {
        "name": "COB LED Displays",
        "products": [
          {
            "name": "Pro Series COB LED Displays",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cob-led-displays/pro-series"
          },
          {
            "name": "Elite COB LED Displays",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cob-led-displays/elite"
          },
          {
            "name": "Ultra COB LED Displays",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cob-led-displays/ultra"
          }
        ]
      },
      {
        "name": "MIP LED Displays",
        "products": [
          {
            "name": "Pro Series MIP LED Displays",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/mip-led-displays/pro-series"
          },
          {
            "name": "Elite MIP LED Displays",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/mip-led-displays/elite"
          },
          {
            "name": "Ultra MIP LED Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/mip-led-displays/ultra"
          }
        ]
      },
      {
        "name": "Creative LED Displays",
        "products": [
          {
            "name": "Pro Series Creative LED Displays",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/creative-led-displays/pro-series"
          },
          {
            "name": "Elite Creative LED Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/creative-led-displays/elite"
          },
          {
            "name": "Ultra Creative LED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/creative-led-displays/ultra"
          }
        ]
      },
      {
        "name": "Curved & Transparent LED Displays",
        "products": [
          {
            "name": "Pro Series Curved & Transparent LED Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/curved-transparent-led-displays/pro-series"
          },
          {
            "name": "Elite Curved & Transparent LED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/curved-transparent-led-displays/elite"
          },
          {
            "name": "Ultra Curved & Transparent LED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/curved-transparent-led-displays/ultra"
          }
        ]
      },
      {
        "name": "All-in-One LED Displays",
        "products": [
          {
            "name": "Pro Series All-in-One LED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/all-in-one-led-displays/pro-series"
          },
          {
            "name": "Elite All-in-One LED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/all-in-one-led-displays/elite"
          },
          {
            "name": "Ultra All-in-One LED Displays",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/all-in-one-led-displays/ultra"
          }
        ]
      },
      {
        "name": "Fixed Installation LED Systems",
        "products": [
          {
            "name": "Pro Series Fixed Installation LED Systems",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fixed-installation-led-systems/pro-series"
          },
          {
            "name": "Elite Fixed Installation LED Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fixed-installation-led-systems/elite"
          },
          {
            "name": "Ultra Fixed Installation LED Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/fixed-installation-led-systems/ultra"
          }
        ]
      }
    ]
  },
  {
    "name": "LCD SCREENS & INTERACTIVE KIOSKS",
    "href": "/products/lcd-screens-interactive-kiosks",
    "subcategories": [
      {
        "name": "Interactive Touch Screens",
        "products": [
          {
            "name": "Pro Series Interactive Touch Screens",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-touch-screens/pro-series"
          },
          {
            "name": "Elite Interactive Touch Screens",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-touch-screens/elite"
          },
          {
            "name": "Ultra Interactive Touch Screens",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-touch-screens/ultra"
          }
        ]
      },
      {
        "name": "Digital Signage Displays",
        "products": [
          {
            "name": "Pro Series Digital Signage Displays",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/digital-signage-displays/pro-series"
          },
          {
            "name": "Elite Digital Signage Displays",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/digital-signage-displays/elite"
          },
          {
            "name": "Ultra Digital Signage Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/digital-signage-displays/ultra"
          }
        ]
      },
      {
        "name": "Interactive Kiosks",
        "products": [
          {
            "name": "Pro Series Interactive Kiosks",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-kiosks/pro-series"
          },
          {
            "name": "Elite Interactive Kiosks",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-kiosks/elite"
          },
          {
            "name": "Ultra Interactive Kiosks",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/interactive-kiosks/ultra"
          }
        ]
      },
      {
        "name": "OLED Displays",
        "products": [
          {
            "name": "Pro Series OLED Displays",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/oled-displays/pro-series"
          },
          {
            "name": "Elite OLED Displays",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/oled-displays/elite"
          },
          {
            "name": "Ultra OLED Displays",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/oled-displays/ultra"
          }
        ]
      },
      {
        "name": "Transparent OLED Systems",
        "products": [
          {
            "name": "Pro Series Transparent OLED Systems",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/transparent-oled-systems/pro-series"
          },
          {
            "name": "Elite Transparent OLED Systems",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/transparent-oled-systems/elite"
          },
          {
            "name": "Ultra Transparent OLED Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/transparent-oled-systems/ultra"
          }
        ]
      },
      {
        "name": "Self-Service Kiosks",
        "products": [
          {
            "name": "Pro Series Self-Service Kiosks",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/self-service-kiosks/pro-series"
          },
          {
            "name": "Elite Self-Service Kiosks",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/self-service-kiosks/elite"
          },
          {
            "name": "Ultra Self-Service Kiosks",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/self-service-kiosks/ultra"
          }
        ]
      },
      {
        "name": "Enterprise Collaboration Displays",
        "products": [
          {
            "name": "Pro Series Enterprise Collaboration Displays",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/enterprise-collaboration-displays/pro-series"
          },
          {
            "name": "Elite Enterprise Collaboration Displays",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/enterprise-collaboration-displays/elite"
          },
          {
            "name": "Ultra Enterprise Collaboration Displays",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/enterprise-collaboration-displays/ultra"
          }
        ]
      },
      {
        "name": "Meeting Room Solutions",
        "products": [
          {
            "name": "Pro Series Meeting Room Solutions",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/meeting-room-solutions/pro-series"
          },
          {
            "name": "Elite Meeting Room Solutions",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/meeting-room-solutions/elite"
          },
          {
            "name": "Ultra Meeting Room Solutions",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/meeting-room-solutions/ultra"
          }
        ]
      },
      {
        "name": "Information & Wayfinding Systems",
        "products": [
          {
            "name": "Pro Series Information & Wayfinding Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/information-wayfinding-systems/pro-series"
          },
          {
            "name": "Elite Information & Wayfinding Systems",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/information-wayfinding-systems/elite"
          },
          {
            "name": "Ultra Information & Wayfinding Systems",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/information-wayfinding-systems/ultra"
          }
        ]
      }
    ]
  },
  {
    "name": "LIGHTING SYSTEMS",
    "href": "/products/lighting-systems",
    "subcategories": [
      {
        "name": "Moving Head Lights",
        "products": [
          {
            "name": "Pro Series Moving Head Lights",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/moving-head-lights/pro-series"
          },
          {
            "name": "Elite Moving Head Lights",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/moving-head-lights/elite"
          },
          {
            "name": "Ultra Moving Head Lights",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/moving-head-lights/ultra"
          }
        ]
      },
      {
        "name": "Beam Lights",
        "products": [
          {
            "name": "Pro Series Beam Lights",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/beam-lights/pro-series"
          },
          {
            "name": "Elite Beam Lights",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/beam-lights/elite"
          },
          {
            "name": "Ultra Beam Lights",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/beam-lights/ultra"
          }
        ]
      },
      {
        "name": "Wash Lights",
        "products": [
          {
            "name": "Pro Series Wash Lights",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wash-lights/pro-series"
          },
          {
            "name": "Elite Wash Lights",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wash-lights/elite"
          },
          {
            "name": "Ultra Wash Lights",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wash-lights/ultra"
          }
        ]
      },
      {
        "name": "Hybrid Fixtures",
        "products": [
          {
            "name": "Pro Series Hybrid Fixtures",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/hybrid-fixtures/pro-series"
          },
          {
            "name": "Elite Hybrid Fixtures",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/hybrid-fixtures/elite"
          },
          {
            "name": "Ultra Hybrid Fixtures",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/hybrid-fixtures/ultra"
          }
        ]
      },
      {
        "name": "Profile Lights",
        "products": [
          {
            "name": "Pro Series Profile Lights",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/profile-lights/pro-series"
          },
          {
            "name": "Elite Profile Lights",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/profile-lights/elite"
          },
          {
            "name": "Ultra Profile Lights",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/profile-lights/ultra"
          }
        ]
      },
      {
        "name": "Outdoor IP Lighting",
        "products": [
          {
            "name": "Pro Series Outdoor IP Lighting",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-ip-lighting/pro-series"
          },
          {
            "name": "Elite Outdoor IP Lighting",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-ip-lighting/elite"
          },
          {
            "name": "Ultra Outdoor IP Lighting",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/outdoor-ip-lighting/ultra"
          }
        ]
      },
      {
        "name": "Architectural Lighting",
        "products": [
          {
            "name": "Pro Series Architectural Lighting",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/architectural-lighting/pro-series"
          },
          {
            "name": "Elite Architectural Lighting",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/architectural-lighting/elite"
          },
          {
            "name": "Ultra Architectural Lighting",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/architectural-lighting/ultra"
          }
        ]
      },
      {
        "name": "Effect Lighting",
        "products": [
          {
            "name": "Pro Series Effect Lighting",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/effect-lighting/pro-series"
          },
          {
            "name": "Elite Effect Lighting",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/effect-lighting/elite"
          },
          {
            "name": "Ultra Effect Lighting",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/effect-lighting/ultra"
          }
        ]
      },
      {
        "name": "Follow Spots",
        "products": [
          {
            "name": "Pro Series Follow Spots",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/follow-spots/pro-series"
          },
          {
            "name": "Elite Follow Spots",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/follow-spots/elite"
          },
          {
            "name": "Ultra Follow Spots",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/follow-spots/ultra"
          }
        ]
      },
      {
        "name": "DMX & Control Systems",
        "products": [
          {
            "name": "Pro Series DMX & Control Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-control-systems/pro-series"
          },
          {
            "name": "Elite DMX & Control Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-control-systems/elite"
          },
          {
            "name": "Ultra DMX & Control Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-control-systems/ultra"
          }
        ]
      }
    ]
  },
  {
    "name": "PROFESSIONAL AUDIO SYSTEMS",
    "href": "/products/professional-audio-systems",
    "subcategories": [
      {
        "name": "Line Array Systems",
        "products": [
          {
            "name": "Pro Series Line Array Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/line-array-systems/pro-series"
          },
          {
            "name": "Elite Line Array Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/line-array-systems/elite"
          },
          {
            "name": "Ultra Line Array Systems",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/line-array-systems/ultra"
          }
        ]
      },
      {
        "name": "Professional Speakers",
        "products": [
          {
            "name": "Pro Series Professional Speakers",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/professional-speakers/pro-series"
          },
          {
            "name": "Elite Professional Speakers",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/professional-speakers/elite"
          },
          {
            "name": "Ultra Professional Speakers",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/professional-speakers/ultra"
          }
        ]
      },
      {
        "name": "Subwoofers",
        "products": [
          {
            "name": "Pro Series Subwoofers",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/subwoofers/pro-series"
          },
          {
            "name": "Elite Subwoofers",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/subwoofers/elite"
          },
          {
            "name": "Ultra Subwoofers",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/subwoofers/ultra"
          }
        ]
      },
      {
        "name": "Amplifiers",
        "products": [
          {
            "name": "Pro Series Amplifiers",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/amplifiers/pro-series"
          },
          {
            "name": "Elite Amplifiers",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/amplifiers/elite"
          },
          {
            "name": "Ultra Amplifiers",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/amplifiers/ultra"
          }
        ]
      },
      {
        "name": "DSP Systems",
        "products": [
          {
            "name": "Pro Series DSP Systems",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dsp-systems/pro-series"
          },
          {
            "name": "Elite DSP Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dsp-systems/elite"
          },
          {
            "name": "Ultra DSP Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dsp-systems/ultra"
          }
        ]
      },
      {
        "name": "Installation Audio",
        "products": [
          {
            "name": "Pro Series Installation Audio",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/installation-audio/pro-series"
          },
          {
            "name": "Elite Installation Audio",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/installation-audio/elite"
          },
          {
            "name": "Ultra Installation Audio",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/installation-audio/ultra"
          }
        ]
      },
      {
        "name": "Conference Audio Systems",
        "products": [
          {
            "name": "Pro Series Conference Audio Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/conference-audio-systems/pro-series"
          },
          {
            "name": "Elite Conference Audio Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/conference-audio-systems/elite"
          },
          {
            "name": "Ultra Conference Audio Systems",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/conference-audio-systems/ultra"
          }
        ]
      },
      {
        "name": "Portable Sound Systems",
        "products": [
          {
            "name": "Pro Series Portable Sound Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/portable-sound-systems/pro-series"
          },
          {
            "name": "Elite Portable Sound Systems",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/portable-sound-systems/elite"
          },
          {
            "name": "Ultra Portable Sound Systems",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/portable-sound-systems/ultra"
          }
        ]
      },
      {
        "name": "Wireless Audio Solutions",
        "products": [
          {
            "name": "Pro Series Wireless Audio Solutions",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wireless-audio-solutions/pro-series"
          },
          {
            "name": "Elite Wireless Audio Solutions",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wireless-audio-solutions/elite"
          },
          {
            "name": "Ultra Wireless Audio Solutions",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/wireless-audio-solutions/ultra"
          }
        ]
      }
    ]
  },
  {
    "name": "POWER DISTRIBUTION & CABLE SOLUTIONS",
    "href": "/products/power-distribution-cable-solutions",
    "subcategories": [
      {
        "name": "Power Distribution Units",
        "products": [
          {
            "name": "Pro Series Power Distribution Units",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-distribution-units/pro-series"
          },
          {
            "name": "Elite Power Distribution Units",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-distribution-units/elite"
          },
          {
            "name": "Ultra Power Distribution Units",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-distribution-units/ultra"
          }
        ]
      },
      {
        "name": "Event Power Systems",
        "products": [
          {
            "name": "Pro Series Event Power Systems",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/event-power-systems/pro-series"
          },
          {
            "name": "Elite Event Power Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/event-power-systems/elite"
          },
          {
            "name": "Ultra Event Power Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/event-power-systems/ultra"
          }
        ]
      },
      {
        "name": "Signal Distribution Systems",
        "products": [
          {
            "name": "Pro Series Signal Distribution Systems",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/signal-distribution-systems/pro-series"
          },
          {
            "name": "Elite Signal Distribution Systems",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/signal-distribution-systems/elite"
          },
          {
            "name": "Ultra Signal Distribution Systems",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/signal-distribution-systems/ultra"
          }
        ]
      },
      {
        "name": "Power Cables",
        "products": [
          {
            "name": "Pro Series Power Cables",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-cables/pro-series"
          },
          {
            "name": "Elite Power Cables",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-cables/elite"
          },
          {
            "name": "Ultra Power Cables",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/power-cables/ultra"
          }
        ]
      },
      {
        "name": "Audio Cables",
        "products": [
          {
            "name": "Pro Series Audio Cables",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/audio-cables/pro-series"
          },
          {
            "name": "Elite Audio Cables",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/audio-cables/elite"
          },
          {
            "name": "Ultra Audio Cables",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/audio-cables/ultra"
          }
        ]
      },
      {
        "name": "Video & Data Cables",
        "products": [
          {
            "name": "Pro Series Video & Data Cables",
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/video-data-cables/pro-series"
          },
          {
            "name": "Elite Video & Data Cables",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/video-data-cables/elite"
          },
          {
            "name": "Ultra Video & Data Cables",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/video-data-cables/ultra"
          }
        ]
      },
      {
        "name": "DMX & Signal Solutions",
        "products": [
          {
            "name": "Pro Series DMX & Signal Solutions",
            "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-signal-solutions/pro-series"
          },
          {
            "name": "Elite DMX & Signal Solutions",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-signal-solutions/elite"
          },
          {
            "name": "Ultra DMX & Signal Solutions",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/dmx-signal-solutions/ultra"
          }
        ]
      },
      {
        "name": "Connectors & Accessories",
        "products": [
          {
            "name": "Pro Series Connectors & Accessories",
            "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/connectors-accessories/pro-series"
          },
          {
            "name": "Elite Connectors & Accessories",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/connectors-accessories/elite"
          },
          {
            "name": "Ultra Connectors & Accessories",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/connectors-accessories/ultra"
          }
        ]
      },
      {
        "name": "Cable Management Solutions",
        "products": [
          {
            "name": "Pro Series Cable Management Solutions",
            "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cable-management-solutions/pro-series"
          },
          {
            "name": "Elite Cable Management Solutions",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cable-management-solutions/elite"
          },
          {
            "name": "Ultra Cable Management Solutions",
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            "href": "/products/cable-management-solutions/ultra"
          }
        ]
      }
    ]
  }
];

export default function ProductDropdown({ onClose }: { onClose?: () => void }) {
  const [categories, setCategories] = useState<Category[]>(productCategories);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<number | null>(0);

  useEffect(() => {
    async function loadDynamicNav() {
      try {
        const res = await fetch("/api/products-nav");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Dynamic navbar product tree fetch failure, using fallback:", err);
      }
    }
    loadDynamicNav();
  }, []);

  const activeCategory = categories[activeCategoryIndex];
  const activeSub = activeCategory?.subcategories[activeSubIndex];

  const handleCategoryClick = (i: number) => {
    setActiveCategoryIndex(i);
    setActiveSubIndex(0);
  };

  const toggleMobileCat = (i: number) => {
    setMobileExpandedCat(mobileExpandedCat === i ? null : i);
  };

  return (
    <>
      {/* ─── MOBILE VERSION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed top-[72px] left-0 right-0 z-[100] bg-white border-t border-black/[0.06] overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 72px)" }}
      >
        <div className="py-2 divide-y divide-black/[0.04]">
          {categories.map((cat, i) => (
            <div key={cat.name} className="flex flex-col">
              {/* Category */}
              <button
                onClick={() => toggleMobileCat(i)}
                className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
              >
                <span className="text-[13px] font-black tracking-tight">{cat.name}</span>
                {mobileExpandedCat === i ? (
                  <ChevronDown size={14} className="text-white/50" />
                ) : (
                  <ChevronRight size={14} className="text-white/50" />
                )}
              </button>

              {/* Subcategories */}
              <AnimatePresence>
                {mobileExpandedCat === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white overflow-hidden"
                  >
                    <Link
                      href={cat.href}
                      onClick={() => onClose?.()}
                      className="flex items-center px-8 py-3 text-blue-600 font-bold border-b border-black/[0.02]"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 mr-3 shrink-0" />
                      <span className="text-[12px] uppercase tracking-wider">All {cat.name}</span>
                    </Link>

                    {cat.subcategories.map((sub) => (
                      <div key={sub.name} className="border-b border-black/[0.02] last:border-0">
                        <div className="px-8 py-3 text-[12px] font-bold text-black/80 bg-slate-50/50">
                          {sub.name}
                        </div>
                        <div className="pl-12 pr-6 py-2 grid grid-cols-1 gap-2">
                          {sub.products.map(prod => {
                            return (
                              <Link 
                                key={prod.name}
                                href={prod.href}
                                onClick={() => onClose?.()}
                                className="text-[11px] text-black/60 hover:text-blue-600 py-1.5 flex items-center"
                              >
                                <ChevronRight size={10} className="mr-2 opacity-50" />
                                {prod.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── DESKTOP VERSION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-[40px] left-[-480px] -translate-x-1/2 w-[min(1280px,calc(100vw-48px))] max-h-[calc(100vh-120px)] z-[100] mt-4 hidden md:block overflow-hidden border border-black/10 shadow-[0_25px_80px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl rounded-none-none"
      >
        <div className="flex min-h-[500px] max-h-[calc(100vh-120px)] bg-white">

          {/* PANEL 1 — Categories */}
          <div className="w-[280px] flex-shrink-0 py-3 bg-slate-900 overflow-y-auto border-r border-white/[0.06] rounded-none-none">
            <div className="px-5 py-2 mb-1">
              <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Categories</span>
            </div>
            {categories.map((cat, i) => {
              const isActive = activeCategoryIndex === i;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(i)}
                  onMouseEnter={() => handleCategoryClick(i)}
                  className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-200 border-l-[3px] ${
                    isActive
                      ? "bg-white/10 border-blue-400 text-white"
                      : "border-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <span className="text-[12px] font-bold leading-tight">{cat.name}</span>
                  <ChevronRight size={12} className={`flex-shrink-0 ml-2 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                </button>
              );
            })}
          </div>

          {/* PANEL 2 — Subcategories */}
          <div className="w-[320px] flex-shrink-0 py-4 overflow-y-auto custom-scrollbar bg-slate-50 border-r border-black/[0.06] rounded-none-none">
            <div className="px-5 py-2 mb-1">
              <span className="text-[10px] font-bold text-black/30 tracking-widest uppercase">Sub Categories</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeCategory?.subcategories.map((sub, i) => (
                  <button
                    key={sub.name}
                    onMouseEnter={() => setActiveSubIndex(i)}
                    onClick={() => setActiveSubIndex(i)}
                    className={`w-full text-left px-5 py-4 border-l-[3px] transition-all duration-200 ${
                      activeSubIndex === i
                        ? "border-blue-500 bg-blue-600/10"
                        : "border-transparent hover:border-blue-500/30 hover:bg-black/5"
                    }`}
                  >
                    <div className={`text-[13px] font-bold ${activeSubIndex === i ? "text-blue-600" : "text-black/80"}`}>
                      {sub.name}
                    </div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL 3 — Products Grid */}
          <div className="flex-1 bg-white p-8 overflow-y-auto rounded-none-none">
            <div className="mb-6 pb-4 border-b border-black/[0.05]">
              <h3 className="text-2xl font-bold text-slate-900">{activeSub?.name}</h3>
              <p className="text-slate-500 text-sm mt-1">Explore our range of {activeSub?.name.toLowerCase()}</p>
            </div>
            
            <AnimatePresence mode="wait">
              {activeSub && (
                <motion.div
                  key={`${activeCategoryIndex}-${activeSubIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-6"
                >
                  {activeSub.products.map(prod => {
                    return (
                      <Link
                        key={prod.name}
                        href={prod.href}
                        onClick={() => onClose?.()}
                        className="group block bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300 rounded-none-none"
                      >
                      <div className="relative w-full h-40 overflow-hidden bg-slate-100 rounded-none-none">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-none-none"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{prod.name}</h4>
                        <div className="text-[11px] text-blue-600 font-semibold flex items-center mt-3">
                          View Detail <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </>
  );
}
