"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  name: string;
  image: string;
  href: string;
}

interface SubCategory {
  name: string;
  image: string;
  products: Product[];
}

interface Category {
  name: string;
  description: string;
  href: string;
  image: string;
  subcategories: SubCategory[];
}

const productCategories: Category[] = [
  {
    "name": "LED DISPLAY SYSTEMS",
    "description": "Brilliant Visuals for Every Environment",
    "href": "/products/led-display-systems",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "name": "Indoor Rental LED Displays",
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
    "description": "Smart Displays for Connected Experiences",
    "href": "/products/lcd-screens-interactive-kiosks",
    "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "name": "Interactive Touch Screens",
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
    "description": "Dynamic Lighting for Immersive Spaces",
    "href": "/products/lighting-systems",
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "name": "Moving Head Lights",
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
    "description": "Precision Audio for Powerful Experiences",
    "href": "/products/professional-audio-systems",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "name": "Line Array Systems",
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
    "description": "Engineered Connectivity. Reliable Performance.",
    "href": "/products/power-distribution-cable-solutions",
    "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "name": "Power Distribution Units",
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
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

export default function ProductsCard({ 
  initialCategorySlug,
  initialSubcategorySlug 
}: { 
  initialCategorySlug?: string;
  initialSubcategorySlug?: string;
}) {
  const router = useRouter();
  const [view, setView] = useState<{
    level: "categories" | "subcategories" | "products";
    categoryIndex?: number;
    subCategoryIndex?: number;
  }>(() => {
    if (initialCategorySlug) {
      const catIdx = productCategories.findIndex(
        (cat) => cat.href.split("/").pop() === initialCategorySlug
      );
      if (catIdx !== -1) {
        if (initialSubcategorySlug) {
          const subCatIdx = productCategories[catIdx].subcategories.findIndex(
            (sub) => sub.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === initialSubcategorySlug
          );
          if (subCatIdx !== -1) {
            return { level: "products", categoryIndex: catIdx, subCategoryIndex: subCatIdx };
          }
        }
        return { level: "subcategories", categoryIndex: catIdx };
      }
    }
    return { level: "categories" };
  });

  const handleBack = () => {
    if (view.level === "subcategories") {
      router.push("/products");
    } else if (view.level === "products") {
      router.push(productCategories[view.categoryIndex!].href);
    }
  };

  const currentItems =
    view.level === "categories"
      ? productCategories
      : view.level === "subcategories"
      ? productCategories[view.categoryIndex!].subcategories
      : productCategories[view.categoryIndex!].subcategories[view.subCategoryIndex!].products;

  const currentTitle =
    view.level === "categories"
      ? "Our Product Categories"
      : view.level === "subcategories"
      ? productCategories[view.categoryIndex!].name
      : productCategories[view.categoryIndex!].subcategories[view.subCategoryIndex!].name;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-72 w-72 bg-blue-100 blur-3xl opacity-40 rounded-none-none" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-blue-200 blur-3xl opacity-30 rounded-none-none" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block border border-blue-200 bg-blue-50 px-4 py-1 text-[10px] font-semibold tracking-wide text-blue-700">
            OUR PRODUCTS
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {currentTitle}
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 bg-gradient-to-r from-blue-500 to-blue-700" />
        </div>

        {/* Navigation Controls */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {view.level !== "categories" && (
            <button
              onClick={handleBack}
              className="flex sm:hidden items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 w-fit rounded-none-none"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => router.push("/products")}
              className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 transition-all rounded-none-none ${
                view.level === "categories" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            {view.categoryIndex !== undefined && (
              <>
                <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                <button
                  onClick={() => router.push(productCategories[view.categoryIndex!].href)}
                  className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 transition-all rounded-none-none ${
                    view.level === "subcategories" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {productCategories[view.categoryIndex].name}
                </button>
              </>
            )}
            {view.subCategoryIndex !== undefined && (
              <>
                <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                <button
                  className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 bg-blue-600 text-white shadow-lg rounded-none-none"
                >
                  {productCategories[view.categoryIndex!].subcategories[view.subCategoryIndex].name}
                </button>
              </>
            )}
          </div>

          {view.level !== "categories" && (
            <button
              onClick={handleBack}
              className="hidden sm:flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-none-none"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((item: any, index: number) => (
            <motion.div
              key={`${view.level}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-none-none"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden rounded-none-none">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-none-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                    {item.name}
                  </h3>
                </div>

                {/* Level Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-[9px] font-bold text-white uppercase rounded-none-none">
                    {view.level === "categories" ? "Category" : view.level === "subcategories" ? "Sub Category" : "Product"}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-[11px] leading-relaxed text-slate-600 mb-6">
                    {item.description || "Professional solutions engineered for excellence and reliability in demanding environments."}
                  </p>

                  {/* Features/Specs Chips */}
                  {view.level === "categories" && item.subcategories && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.subcategories.slice(0, 4).map((feat: any, idx: number) => (
                        <span
                          key={idx}
                          className="border border-blue-100 bg-blue-50 px-3 py-1 text-[9px] font-medium text-blue-700 rounded-none-none"
                        >
                          {feat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {view.level === "subcategories" && item.products && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.products.slice(0, 4).map((feat: any, idx: number) => (
                        <span
                          key={idx}
                          className="border border-blue-100 bg-blue-50 px-3 py-1 text-[9px] font-medium text-blue-700 rounded-none-none"
                        >
                          {feat.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {view.level === "products" ? (
                    <Link
                      href={`${productCategories[view.categoryIndex!].href}/${productCategories[view.categoryIndex!].subcategories[view.subCategoryIndex!].name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}/${item.href.split('/').pop()}`}
                      className="inline-flex w-full items-center justify-center px-4 border gap-2 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold text-[12px] shadow-lg shadow-blue-200 rounded-none-none"
                    >
                      Explore Product
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (view.level === "categories") {
                          router.push(item.href);
                        } else if (view.level === "subcategories") {
                          const subcatSlug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                          router.push(`${productCategories[view.categoryIndex!].href}/${subcatSlug}`);
                        }
                      }}
                      className="inline-flex w-full items-center justify-center px-4 border gap-2 py-3 bg-white text-blue-600 border-blue-100 hover:bg-blue-50 transition-all font-bold text-[12px] rounded-none-none"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
